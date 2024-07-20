import { injection } from '@/util/inject'
import { generateDistinctName } from '@/util/instanceName'
import { resolveModpackInstanceConfig } from '@/util/modpackFilesResolver'
import { File, HashAlgo } from '@xmcl/curseforge'
import { CreateInstanceOption, CurseForgeServiceKey, CurseforgeUpstream, InstanceServiceKey, ModpackServiceKey, Resource, ResourceServiceKey, getCurseforgeFileUri } from '@xmcl/runtime-api'
import { Ref } from 'vue'
import { kInstanceFiles } from './instanceFiles'
import { kInstanceVersion } from './instanceVersion'
import { kInstanceVersionInstall } from './instanceVersionInstall'
import { kInstances } from './instances'
import { useService } from './service'

export function useCurseforgeInstanceResource() {
  const { getResourceByHash, getResourcesByUris } = useService(ResourceServiceKey)
  async function getResourceByUpstream(upstream: CurseforgeUpstream) {
    let resource: Resource | undefined
    if (upstream.sha1) {
      resource = await getResourceByHash(upstream.sha1)
    }
    if (!resource) {
      const arr = await getResourcesByUris([getCurseforgeFileUri({
        modId: upstream.modId,
        id: upstream.fileId,
      })])
      resource = arr[0]
    }
    return resource
  }
  async function getResourceByFile(file: File) {
    let resource: Resource | undefined
    const sha1 = file.hashes.find(f => f.algo === HashAlgo.Sha1)?.value
    if (file && sha1) {
      resource = await getResourceByHash(sha1)
    }
    if (!resource) {
      const arr = await getResourcesByUris([getCurseforgeFileUri(file)])
      resource = arr[0]
    }
    return resource
  }
  return {
    getResourceByUpstream,
    getResourceByFile,
  }
}

export function useCurseforgeInstallModpack(icon: Ref<string | undefined>) {
  const { instances, selectedInstance } = injection(kInstances)
  const { getModpackInstallFiles } = useService(ModpackServiceKey)
  const { createInstance } = useService(InstanceServiceKey)
  const { installFile } = useService(CurseForgeServiceKey)
  const { installFiles } = injection(kInstanceFiles)
  const { getVersionHeader, getResolvedVersion } = injection(kInstanceVersion)
  const { getInstanceLock, getInstallInstruction, handleInstallInstruction } = injection(kInstanceVersionInstall)
  const { currentRoute, push } = useRouter()
  const installModpack = async (f: File) => {
    const result = await installFile({ file: f, type: 'modpacks', icon: icon.value })
    const resource = result.resource
    const config = resolveModpackInstanceConfig(resource)

    if (!config) return
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
  return installModpack
}
