import { injection } from '@/util/inject'
import { useInstanceModLoaderDefault } from '@/util/instanceModLoaderDefault'
import { generateDistinctName } from '@/util/instanceName'
import { isNoModLoader } from '@/util/isNoModloader'
import { resolveModpackInstanceConfig } from '@/util/modpackFilesResolver'
import { ProjectFile } from '@/util/search'
import { Project, ProjectVersion } from '@xmcl/modrinth'
import { CreateInstanceOption, InstanceServiceKey, ModpackServiceKey, ModrinthServiceKey, Resource, ResourceServiceKey, RuntimeVersions } from '@xmcl/runtime-api'
import { InjectionKey, Ref } from 'vue'
import { kInstanceFiles } from './instanceFiles'
import { kInstanceVersion } from './instanceVersion'
import { kInstanceVersionInstall } from './instanceVersionInstall'
import { kInstances } from './instances'
import { useService } from './service'

export const kModrinthInstaller: InjectionKey<ReturnType<typeof useModrinthInstaller>> = Symbol('modrinthInstaller')

export function useModrinthInstaller(
  path: Ref<string>,
  runtime: Ref<RuntimeVersions>,
  allFiles: Ref<ProjectFile[]>,
  installResource: (resources: Resource[]) => void,
  uninstallFiles: (resources: ProjectFile[]) => void,
) {
  const { installVersion } = useService(ModrinthServiceKey)
  const installDefaultModLoader = useInstanceModLoaderDefault(path, runtime)
  const { getResourcesByUris } = useService(ResourceServiceKey)

  const getResource = async (v: ProjectVersion) => {
    const url = v.files.find(f => f.primary)?.url
    if (url) { return (await getResourcesByUris([url]))[0] }
    return undefined
  }

  const install = async (p: Project, v: ProjectVersion) => {
    const resource = await getResource(v)
    if (resource) {
      installResource([resource])
    } else {
      const { resources } = await installVersion({ version: v, icon: p.icon_url })
      installResource(resources)
    }
  }

  async function installWithDependencies(p: Project, v: ProjectVersion, installed: ProjectFile[], deps: Array<{ recommendedVersion: ProjectVersion; project: Project; type: string }>) {
    if (isNoModLoader(runtime.value)) {
      // forge, fabric, quilt or neoforge
      await installDefaultModLoader(v.loaders)
    }
    const files = [...installed]
    await Promise.all(deps
      ?.filter((v) => v.type === 'required')
      .filter(v => allFiles.value.every(m => m.modrinth?.projectId !== v.project.id))
      .map((v) => install(v.project, v.recommendedVersion)) ?? [])
    await install(p, v)
    if (files.length > 0) {
      uninstallFiles(files)
    }
  }

  return { installWithDependencies, install }
}

export function useModrinthInstallModpack(icon: Ref<string | undefined>) {
  const { instances, selectedInstance } = injection(kInstances)
  const { getModpackInstallFiles } = useService(ModpackServiceKey)
  const { getVersionHeader, getResolvedVersion } = injection(kInstanceVersion)
  const { createInstance } = useService(InstanceServiceKey)
  const { installVersion } = useService(ModrinthServiceKey)
  const { installFiles } = injection(kInstanceFiles)
  const { getInstallInstruction, handleInstallInstruction, getInstanceLock } = injection(kInstanceVersionInstall)
  const { currentRoute, push } = useRouter()
  const installModpack = async (v: ProjectVersion) => {
    const result = await installVersion({ version: v, icon: icon.value })
    const resource = result.resources[0]

    if (!resource) throw new Error('NO_RESOURCE')

    const config = resolveModpackInstanceConfig(resource)

    if (!config) throw new Error('NO_MODPACK_CONFIG')
    const name = generateDistinctName(config.name, instances.value.map(i => i.name))
    const existed = getVersionHeader(config.runtime)
    const options: CreateInstanceOption = {
      ...config,
      name,
    }
    if (existed) {
      options.version = existed.id
    }
    const path = await createInstance(options)

    selectedInstance.value = path
    if (currentRoute.path !== '/') {
      push('/')
    }

    const files = await getModpackInstallFiles(resource.path)

    installFiles(path, files)

    const lock = getInstanceLock(path)
    lock.write(async () => {
      const resolved = existed ? await getResolvedVersion(existed) : undefined
      const instruction = await getInstallInstruction(path, options.runtime!, resolved)
      await handleInstallInstruction(instruction)
    })
  }
  return {
    installModpack,
  }
}
