import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { castToVueI18n, createI18n } from 'vue-i18n-bridge'

Vue.use(VueI18n, { bridge: true })

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob('../locales/*.yaml', { eager: true, import: 'default' })
  ).map(([path, loadLocale]) => [
    path.split('/').pop()?.replace('.yaml', ''),
    loadLocale
  ])
)

export const i18n = castToVueI18n(
  createI18n(
    {
      legacy: false,
      locale: 'en',
      fallbackLocale: 'en',
      silentTranslationWarn: true,
      missingWarn: false,
      fallbackWarn: false,
      messages,
    },
    VueI18n,
  ),
)

Vue.use(i18n)
