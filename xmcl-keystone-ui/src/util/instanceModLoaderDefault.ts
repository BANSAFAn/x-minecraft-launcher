import { useService } from '@/composables'
import { useSWRVConfig } from '@/composables/swrvConfig'
import { getFabricGameVersionsModel, getFabricLoaderVersionsModel, getForgeVersionsModel, getNeoForgedVersionModel, getQuiltGameVersionsModel, getQuiltLoaderVersionsModel } from '@/composables/version'
import { InstanceServiceKey, RuntimeVersions } from '@xmcl/runtime-api'
import { Ref } from 'vue'
import { getSWRV } from './swrvGet'

export function useInstanceModLoaderDefault(path: Ref<string>, runtime: Ref<RuntimeVersions>) {
  const config = useSWRVConfig()
  const { editInstance } = useService(InstanceServiceKey)

  async function apply(loaders: Array<'forge' | 'quilt' | 'neoforge' | 'fabric' | string>) {
    for (const loader of loaders) {
      if (loader === 'fabric') {
        const fit = await getSWRV(getFabricGameVersionsModel(), config)
        if (fit.includes(runtime.value.minecraft)) {
          const versions = await getSWRV(getFabricLoaderVersionsModel(), config)
          const version = versions[0]
          await editInstance({
            instancePath: path.value,
            runtime: {
              ...runtime.value,
              fabricLoader: version.version,
            },
            version: '',
          })
          return true
        }
      } else if (loader === 'quilt') {
        const fit = await getSWRV(getQuiltGameVersionsModel(), config)
        if (fit.includes(runtime.value.minecraft)) {
          const versions = await getSWRV(getQuiltLoaderVersionsModel(), config)
          const version = versions[0]
          await editInstance({
            instancePath: path.value,
            runtime: {
              ...runtime.value,
              quiltLoader: version.version,
            },
            version: '',
          })
          return true
        }
      } else if (loader === 'forge') {
        const forges = await getSWRV(getForgeVersionsModel(runtime.value.minecraft), config)
        const version = forges.find(f => f.type === 'recommended') || forges[0]
        if (version) {
          await editInstance({
            instancePath: path.value,
            runtime: {
              ...runtime.value,
              forge: version.version,
            },
            version: '',
          })
          return true
        }
      } else if (loader === 'neoforge') {
        const versions = await getSWRV(getNeoForgedVersionModel(runtime.value.minecraft), config)
        const version = versions[0]
        if (version) {
          await editInstance({
            instancePath: path.value,
            runtime: {
              ...runtime.value,
              neoForged: version,
            },
            version: '',
          })
          return true
        }
      }
    }

    return false
  }

  return apply
}
