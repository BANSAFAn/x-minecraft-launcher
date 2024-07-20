import type { ResolvedVersion, VersionParseError } from '@xmcl/core'
import { Instance, LocalVersionHeader, RuntimeVersions, ServerVersionHeader, VersionServiceKey, findMatchedVersion } from '@xmcl/runtime-api'
import useSWRV from 'swrv'
import { InjectionKey, Ref } from 'vue'
import { useService } from './service'

function useInstanceVersionBase(instance: Ref<Instance>) {
  const minecraft = computed(() => instance.value.runtime.minecraft)
  const forge = computed(() => instance.value.runtime.forge)
  const fabricLoader = computed(() => instance.value.runtime.fabricLoader)
  const quiltLoader = computed(() => instance.value.runtime.quiltLoader)
  return {
    minecraft,
    forge,
    fabricLoader,
    quiltLoader,
  }
}
export const kInstanceVersion: InjectionKey<ReturnType<typeof useInstanceVersion>> = Symbol('InstanceVersion')

export interface UnresolvedVersion {
  requirements: RuntimeVersions
}

export type InstanceResolveVersion = UnresolvedVersion | (ResolvedVersion & UnresolvedVersion)

export function isResolvedVersion(v?: InstanceResolveVersion): v is (ResolvedVersion & UnresolvedVersion) {
  return !!v && 'id' in v
}

export function useInstanceVersion(instance: Ref<Instance>, local: Ref<LocalVersionHeader[]>, servers: Ref<ServerVersionHeader[]>) {
  const versionHeader = computed(() => {
    if (!instance.value.path) {
      return undefined
    }
    return findMatchedVersion(local.value,
      instance.value.version,
      instance.value.runtime.minecraft,
      instance.value.runtime.forge,
      instance.value.runtime.neoForged,
      instance.value.runtime.fabricLoader,
      instance.value.runtime.optifine,
      instance.value.runtime.quiltLoader,
      instance.value.runtime.labyMod)
  })

  const serverVersionHeader = computed(() => {
    const runtime = instance.value.runtime
    return getServerHeader(runtime)
  })

  const { resolveLocalVersion } = useService(VersionServiceKey)

  async function getResolvedVersion(versionHeader: LocalVersionHeader | undefined, version?: string) {
    let id: string | undefined
    if (!versionHeader) {
      if (!version) {
        return undefined
      } else {
        id = version
      }
    } else {
      id = versionHeader.id
    }
    try {
      const resolvedVersion = await resolveLocalVersion(id)
      return resolvedVersion
    } catch (e) {
      const err = e as VersionParseError
      if (err.name === 'MissingVersionJson') {
        return undefined
      }
      throw e
    }
  }

  const { isValidating, mutate, data: resolvedVersion, error } = useSWRV(() => instance.value.path && `/instance/${instance.value.path}/version`, async () => {
    console.log('update instance version')
    if (!instance.value.path) {
      return undefined
    }
    const version = await getResolvedVersion(versionHeader.value, instance.value.version)
    return { ...version, requirements: instance.value.runtime } || { requirements: instance.value.runtime }
  }, { revalidateOnFocus: false, errorRetryCount: 0, shouldRetryOnError: false })

  watch([versionHeader, local], () => {
    mutate()
  }, { deep: true })

  const serverVersionId = computed(() => serverVersionHeader.value?.id)
  const versionId = computed(() => versionHeader.value?.id)

  function getVersionHeader(runtime: RuntimeVersions) {
    if (!instance.value.path) {
      return undefined
    }
    return findMatchedVersion(local.value,
      instance.value.version,
      runtime.minecraft,
      runtime.forge,
      runtime.neoForged,
      runtime.fabricLoader,
      runtime.optifine,
      runtime.quiltLoader,
      runtime.labyMod)
  }

  function getServerHeader(runtime: RuntimeVersions) {
    const onlyMinecraft = Object.entries(runtime).filter(([k, v]) => k !== 'minecraft' && !!v).length === 0
    console.log(servers.value)
    for (const s of servers.value) {
      if (s.minecraft !== runtime.minecraft) {
        continue
      }
      if (runtime.forge) {
        if (s.version === runtime.forge && s.type === 'forge') {
          return s
        }
      }
      if (runtime.fabricLoader) {
        if (s.version === runtime.fabricLoader && s.type === 'fabric') {
          return s
        }
      }
      if (runtime.neoForged) {
        if (s.version === runtime.neoForged && s.type === 'neoforge') {
          return s
        }
      }
      if (runtime.quiltLoader) {
        if (s.version === runtime.quiltLoader && s.type === 'quilt') {
          return s
        }
      }
      if (s.type === 'vanilla' && onlyMinecraft) {
        return s
      }
    }
    return undefined
  }

  return {
    ...useInstanceVersionBase(instance),
    getVersionHeader,
    getServerHeader,
    getResolvedVersion,
    versionId,
    serverVersionId,
    versionHeader,
    serverVersionHeader,
    error,
    isValidating,
    resolvedVersion,
  }
}
