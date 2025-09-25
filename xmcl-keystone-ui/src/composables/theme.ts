import { loadV1Theme } from '@/util/theme.v0'
import { deserialize, deserialize as deserializeV0, serialize } from '@/util/theme.v1'
import { useStyleTag } from '@vueuse/core'
import { BaseServiceKey, MediaData, ThemeData, ThemeServiceKey } from '@xmcl/runtime-api'
import debounce from 'lodash.debounce'
import { InjectionKey, computed, set } from 'vue'
import { Framework } from 'vuetify'
import { useLocalStorageCacheStringValue } from './cache'
import { useService } from './service'
import { injection } from '@/util/inject'

export const kTheme: InjectionKey<ReturnType<typeof useTheme>> = Symbol('theme')

export enum ParticleMode {
  PUSH = 'push',
  REMOVE = 'remove',
  REPULSE = 'repulse',
  BUBBLE = 'bubble',
}

export enum BackgroundType {
  NONE = 'none',
  PARTICLE = 'particle',
  HALO = 'halo',
  IMAGE = 'image',
  VIDEO = 'video',
}

export interface UIThemeDataV1 {
  name: string

  dark: boolean
  colors: {
    lightAppBarColor: string
    lightSideBarColor: string
    darkAppBarColor: string
    darkSideBarColor: string
    darkPrimaryColor: string
    darkBackground: string
    darkInfoColor: string
    darkErrorColor: string
    darkWarningColor: string
    darkSuccessColor: string
    darkAccentColor: string
    darkCardColor: string
    lightPrimaryColor: string
    lightBackground: string
    lightInfoColor: string
    lightErrorColor: string
    lightWarningColor: string
    lightSuccessColor: string
    lightAccentColor: string
    lightCardColor: string
  }

  blur: {
    appBar?: number
    sideBar?: number
    background?: number
    card?: number
  }

  backgroundMusic: MediaData[]
  backgroundMusicPlayOrder?: 'sequential' | 'shuffle'
  backgroundImage?: MediaData // image or video
  backgroundColorOverlay?: boolean
  backgroundType?: BackgroundType
  backgroundVolume?: number
  backgroundImageFit: 'cover' | 'contain'

  font?: MediaData
  fontSize?: number
  particleMode?: ParticleMode
}

export function getDefaultTheme(): UIThemeDataV1 {
  return {
    name: 'default',
    dark: true,
    backgroundMusic: [],
    backgroundMusicPlayOrder: 'sequential',
    colors: {
      lightAppBarColor: '#e0e0e0FF',
      lightSideBarColor: '#FFFFFFFF',
      darkAppBarColor: '#111111FF',
      darkSideBarColor: '#11111166',
      darkPrimaryColor: '#4caf50',
      darkBackground: '#121212A5',
      darkInfoColor: '#2196F3',
      darkErrorColor: '#FF5252',
      darkWarningColor: '#FB8C00',

      darkSuccessColor: '#4CAF50',
      darkAccentColor: '#00e676',
      darkCardColor: '#0c0c0ccc',
      lightPrimaryColor: '#1976D2',
      lightBackground: '#FFFFFF',
      lightInfoColor: '#2196F3',
      lightErrorColor: '#FF5252',
      lightWarningColor: '#FB8C00',
      lightSuccessColor: '#4CAF50',
      lightAccentColor: '#82B1FF',
      lightCardColor: '#e0e0e080',
    },
    backgroundColorOverlay: true,
    backgroundVolume: 1,
    backgroundImage: undefined,
    backgroundImageFit: 'cover',
    backgroundType: BackgroundType.NONE,
    font: undefined,
    fontSize: 16,
    blur: {
      background: 3,
      card: 20,
      appBar: 3,
      sideBar: 3,
    }
  }
}

export function useThemesItems() {
  const { themes } = injection(kTheme)
  const { t } = useI18n()
  //   const themes = computed(() => [{
  //   text: t('setting.theme.dark'),
  //   value: 'dark',
  // }, {
  //   text: t('setting.theme.light'),
  //   value: 'light',
  // }, {
  //   text: t('setting.theme.system'),
  //   value: 'system',
  // }])

  const items = computed(() => {
    return themes.value.map((theme) => {
      return {
        text: theme.name === 'default-dark' ? t('setting.theme.dark') : theme.name === 'default-light' ? t('setting.theme.light') : theme.name,
        value: theme.name,
      }
    })
  })

  return items
}

export interface UIThemeData {
  name: string

  colors: {
    lightAppBarColor: string
    lightSideBarColor: string
    darkAppBarColor: string
    darkSideBarColor: string
    darkPrimaryColor: string
    darkBackground: string
    darkInfoColor: string
    darkErrorColor: string
    darkWarningColor: string
    darkSuccessColor: string
    darkAccentColor: string
    darkCardColor: string
    lightPrimaryColor: string
    lightBackground: string
    lightInfoColor: string
    lightErrorColor: string
    lightWarningColor: string
    lightSuccessColor: string
    lightAccentColor: string
    lightCardColor: string
  }
  backgroundMusic: MediaData[]
  backgroundMusicPlayOrder?: 'sequential' | 'shuffle'
  backgroundImage?: MediaData // image or video
  backgroundColorOverlay?: boolean
  backgroundType?: BackgroundType
  backgroundVolume?: number
  backgroundImageFit: 'cover' | 'contain'
  font?: MediaData
  fontSize?: number
  particleMode?: ParticleMode
  blur: number
  blurSidebar?: number
  blurAppBar?: number
}

export function useTheme(framework: Framework, { addMedia, removeMedia, exportTheme, importTheme, getThemes, getTheme, setTheme } = useService(ThemeServiceKey)) {
  const selectedThemeName = useLocalStorageCacheStringValue('selectedThemeName', 'default' as string)
  const currentTheme = ref<UIThemeDataV1>(getDefaultTheme())
  const themes = ref<UIThemeDataV1[]>([])

  function update() {
    getThemes().then((v) => {
      themes.value = v.map((theme) => {
        const t = deserialize(theme)
        if (!t) return getDefaultTheme()
        return t
      })
    })
  }
  onMounted(update)

  const isDark = computed({
    get: () => currentTheme.value.dark,
    set: (dark: boolean) => {
      currentTheme.value.dark = dark
      writeTheme(currentTheme.value.name, currentTheme.value)
    }
  })
  watch(isDark, (dark) => {
    framework.theme.dark = dark
  }, { immediate: true })

  const backgroundType = computed({
    get() { return currentTheme.value.backgroundType ?? BackgroundType.NONE },
    set(v: BackgroundType) {
      currentTheme.value.backgroundType = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const blur = computed({
    get() { return currentTheme.value.blur?.background ?? 0 },
    set(v: number) {
      if (!currentTheme.value.blur) currentTheme.value.blur = {};
      currentTheme.value.blur.background = v;
      writeTheme(currentTheme.value.name, currentTheme.value);
    },
  })
  const blurCard = computed({
    get() { return currentTheme.value.blur.card ?? 22 },
    set(v: number) {
      currentTheme.value.blur.card = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    }
  })
  const backgroundImage = computed(() => currentTheme.value.backgroundImage)
  const backgroundColorOverlay = computed({
    get() { return currentTheme.value.backgroundColorOverlay ?? false },
    set(v: boolean) {
      currentTheme.value.backgroundColorOverlay = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const backgroundMusic = computed(() => currentTheme.value.backgroundMusic ?? [])
  const backgroundImageFit = computed({
    get() { return currentTheme.value.backgroundImageFit },
    set(v: 'cover' | 'contain') {
      currentTheme.value.backgroundImageFit = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const particleMode = computed({
    get() { return currentTheme.value.particleMode ?? ParticleMode.PUSH },
    set(v: ParticleMode) {
      currentTheme.value.particleMode = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const blurSidebar = computed({
    get() { return currentTheme.value.blur?.sideBar ?? 4 },
    set(v: number) {
      if (!currentTheme.value) return
      if (!currentTheme.value.blur) currentTheme.value.blur = {};
      currentTheme.value.blur.sideBar = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const blurAppBar = computed({
    get() { return currentTheme.value.blur?.appBar ?? 4 },
    set(v: number) {
      if (!currentTheme.value) return
      if (!currentTheme.value.blur) currentTheme.value.blur = {};
      currentTheme.value.blur.appBar = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const volume = computed({
    get() { return currentTheme.value.backgroundVolume ?? 0 },
    set(v: number) {
      if (!currentTheme.value) return
      currentTheme.value.backgroundVolume = v
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const appBarColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkAppBarColor : currentTheme.value.colors.lightAppBarColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkAppBarColor = v
      } else {
        currentTheme.value.colors.lightAppBarColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const sideBarColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkSideBarColor : currentTheme.value.colors.lightSideBarColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkSideBarColor = v
      } else {
        currentTheme.value.colors.lightSideBarColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const primaryColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkPrimaryColor : currentTheme.value.colors.lightPrimaryColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkPrimaryColor = v
      } else {
        currentTheme.value.colors.lightPrimaryColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const backgroundColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkBackground : currentTheme.value.colors.lightBackground ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkBackground = v
      } else {
        currentTheme.value.colors.lightBackground = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const infoColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkInfoColor : currentTheme.value.colors.lightInfoColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkInfoColor = v
      } else {
        currentTheme.value.colors.lightInfoColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const errorColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkErrorColor : currentTheme.value.colors.lightErrorColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkErrorColor = v
      } else {
        currentTheme.value.colors.lightErrorColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const warningColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkWarningColor : currentTheme.value.colors.lightWarningColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkWarningColor = v
      } else {
        currentTheme.value.colors.lightWarningColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const successColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkSuccessColor : currentTheme.value.colors.lightSuccessColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkSuccessColor = v
      } else {
        currentTheme.value.colors.lightSuccessColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const accentColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkAccentColor : currentTheme.value.colors.lightAccentColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkAccentColor = v
      } else {
        currentTheme.value.colors.lightAccentColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })
  const cardColor = computed({
    get: () => isDark.value ? currentTheme.value.colors.darkCardColor : currentTheme.value.colors.lightCardColor ?? '',
    set: (v: string) => {
      if (isDark.value) {
        currentTheme.value.colors.darkCardColor = v
      } else {
        currentTheme.value.colors.lightCardColor = v
      }
      writeTheme(currentTheme.value.name, currentTheme.value)
    },
  })

  const baseService = useService(BaseServiceKey)
  const isTransparent = computed(() => baseService.settings.transparentBackground)

  useStyleTag(computed(() => `
    .v-application {
      background-color: ${isTransparent.value ? 'transparent !important' : backgroundColor.value};
    }
  `))

  const backgroundImageOverride = ref('')
  const backgroundImageOverrideOpacity = ref(1)

  return {
    themes,
    isDark,
    currentTheme,
    backgroundImage,
    backgroundImageFit,
    backgroundMusic,
    backgroundType,
    particleMode,
    blurSidebar,
    blurAppBar,
    blurCard,
    volume,
    blur,
    // darkTheme, // This should be removed or replaced by isDark if it was exported
    exportTheme: _exportTheme, // Note: _exportTheme also needs updates for V2
    importTheme: _importTheme, // Note: _importTheme needs significant updates for V2
    backgroundImageOverride,
    backgroundImageOverrideOpacity,
    backgroundColorOverlay,

    appBarColor,
    sideBarColor,
    primaryColor,
    backgroundColor,
    infoColor,
    errorColor,
    warningColor,
    successColor,
    accentColor,
    cardColor,
    resetToDefault,

    font,
    setFont,
    fontSize,
    resetFont,

    removeMusic,
    addMusic,
    setBackgroundImage,
    clearBackgroundImage,
  }
}
