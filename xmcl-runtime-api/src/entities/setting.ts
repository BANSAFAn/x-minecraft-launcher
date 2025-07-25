import { InvalidDirectoryErrorCode } from '../services/BaseService'
import { SettingSchema } from './setting.schema'
import { ReleaseInfo } from './update'

/**
 * The basic setting of the launcher.
 *
 * It also contains the some state properties of the launcher.
 */
export class Settings implements SettingSchema {
  globalDisableAuthlibInjector = false
  globalDisableElyByAuthlib = false
  globalMinMemory = 0
  globalMaxMemory = 0
  globalAssignMemory: 'auto' | boolean = false
  globalVmOptions: string[] = []
  globalMcOptions: string[] = []
  globalPrependCommand: string = ''
  globalPreExecuteCommand: string = ''
  globalFastLaunch = false
  globalHideLauncher = false
  globalShowLog = false
  globalEnv: Record<string, string> = {}
  globalResolution: { width?: number; height?: number; fullscreen?: boolean } = {}
  discordPresence = false
  developerMode = false
  disableTelemetry = false
  linuxTitlebar = false

  locale = ''

  theme = 'dark' as 'dark' | 'light' | 'system'
  sidebarPosition = 'left' as 'left' | 'right'
  visibleCards: string[] = ['mod', 'resource-pack', 'shader-pack', 'save', 'screenshots']
  textColor = '#000000'
  /**
   * All supported languages of the launcher
   */
  locales: {
    /**
     * The i18n locale key
     */
    locale: string
    /**
     * The human readable name of the locale
     */
    name: string
  }[] = []

  updateInfo: ReleaseInfo | null = null
  updateStatus: 'ready' | 'none' | 'pending' = 'none'
  allowPrerelease = false
  autoInstallOnAppQuit = false
  autoDownload = false
  enableDedicatedGPUOptimization = true
  apiSetsPreference: 'mojang' | 'bmcl' | '' = ''
  apiSets = [{ name: 'bmcl', url: 'https://bmclapi2.bangbang93.com' }]
  /**
   * Is current environment connecting to internet?
   */
  online = false
  allowTurn = false
  replaceNatives: 'all' | 'legacy-only' | false = 'legacy-only'

  httpProxy = ''

  httpProxyEnabled = false

  maxSockets = 0

  maxAPISockets = 0

  diskFullError = false

  databaseReady = false

  invalidGameDataPath: InvalidDirectoryErrorCode = undefined

  config(config: SettingSchema) {
    this.locale = config.locale
    this.autoDownload = config.autoDownload || false
    this.autoInstallOnAppQuit = config.autoDownload || false
    this.allowPrerelease = config.allowPrerelease || false
    this.apiSetsPreference = config.apiSetsPreference
    this.httpProxy = config.httpProxy
    this.httpProxyEnabled = config.httpProxyEnabled
    this.maxSockets = config.maxSockets ?? 16
    this.maxAPISockets = config.maxAPISockets ?? 0
    this.allowTurn = config.allowTurn ?? false
    this.theme = config.theme
    this.sidebarPosition = config.sidebarPosition ?? 'left'
    this.textColor = config.textColor ?? '#000000'
    this.globalMinMemory = config.globalMinMemory
    this.globalMaxMemory = config.globalMaxMemory
    this.globalAssignMemory = config.globalAssignMemory
    this.globalVmOptions = config.globalVmOptions
    this.globalMcOptions = config.globalMcOptions
    this.globalFastLaunch = config.globalFastLaunch
    this.globalPrependCommand = config.globalPrependCommand
    this.globalHideLauncher = config.globalHideLauncher
    this.globalShowLog = config.globalShowLog
    this.globalDisableElyByAuthlib = config.globalDisableElyByAuthlib
    this.globalDisableAuthlibInjector = config.globalDisableAuthlibInjector
    this.globalPreExecuteCommand = config.globalPreExecuteCommand
    this.globalEnv = config.globalEnv
    this.discordPresence = config.discordPresence
    this.developerMode = config.developerMode
    this.disableTelemetry = config.disableTelemetry
    this.linuxTitlebar = config.linuxTitlebar
    this.enableDedicatedGPUOptimization = config.enableDedicatedGPUOptimization
    this.replaceNatives = config.replaceNatives
    this.globalResolution = config.globalResolution
  }

  developerModeSet(developerMode: boolean) {
    this.developerMode = developerMode
  }

  discordPresenceSet(presence: boolean) {
    this.discordPresence = presence
  }

  themeSet(theme: 'dark' | 'light' | 'system') {
    this.theme = theme
  }

  sidebarPositionSet(position: 'left' | 'right') {
    this.sidebarPosition = position
  }

  visibleCardsSet(cards: string[]) {
    this.visibleCards = cards
  }

  textColorSet(color: string) {
    this.textColor = color
  }

  localeSet(language: string) {
    this.locale = language
  }

  enableDedicatedGPUOptimizationSet(enabled: boolean) {
    this.enableDedicatedGPUOptimization = enabled
  }

  localesSet(languages: {
    /**
     * The i18n locale key
     */
    locale: string
    /**
     * The human readable name of the locale
     */
    name: string
  }[]) {
    this.locales = languages
  }

  httpProxySet(proxy: string) {
    this.httpProxy = proxy
  }

  httpProxyEnabledSet(enabled: boolean) {
    this.httpProxyEnabled = enabled
  }

  allowPrereleaseSet(allowPrerelease: boolean) {
    if (typeof allowPrerelease === 'boolean') { this.allowPrerelease = allowPrerelease }
  }

  autoInstallOnAppQuitSet(autoInstallOnAppQuit: boolean) {
    if (typeof autoInstallOnAppQuit === 'boolean') this.autoInstallOnAppQuit = autoInstallOnAppQuit
  }

  updateStatusSet(updateStatus: 'ready' | 'none' | 'pending') {
    this.updateStatus = updateStatus
  }

  autoDownloadSet(autoDownload: boolean) {
    if (typeof autoDownload === 'boolean') this.autoDownload = autoDownload
  }

  updateInfoSet(updateInfo: ReleaseInfo) {
    if (typeof updateInfo === 'object') this.updateInfo = updateInfo
  }

  apiSetsPreferenceSet(apiSetsPreference: 'mojang' | 'bmcl' | '') {
    this.apiSetsPreference = apiSetsPreference
  }

  apiSetsSet(sets: { name: string; url: string }[]) {
    this.apiSets = sets
  }

  allowTurnSet(allowTurn: boolean) {
    this.allowTurn = allowTurn
  }

  onlineSet(online: boolean) {
    this.online = online
  }

  maxSocketsSet(val: number) {
    this.maxSockets = Number(val)
  }

  maxAPISocketsSet(val: number) {
    this.maxAPISockets = val
  }

  disableTelemetrySet(disable: boolean) {
    this.disableTelemetry = disable
  }

  linuxTitlebarSet(enabled: boolean) {
    this.linuxTitlebar = enabled
  }

  replaceNativesSet(replace: 'all' | 'legacy-only' | false) {
    this.replaceNatives = replace
  }

  globalResolutionSet(resolution: { width?: number; height?: number; fullscreen?: boolean }) {
    this.globalResolution = resolution
  }

  diskFullErrorSet(diskFullError: boolean) {
    this.diskFullError = diskFullError
  }

  databaseReadySet(ready: boolean) {
    this.databaseReady = ready
  }

  invalidGameDataPathSet(invalid: InvalidDirectoryErrorCode) {
    this.invalidGameDataPath = invalid
  }

  globalInstanceSetting(settings: {
    globalMinMemory: number
    globalMaxMemory: number
    globalAssignMemory: boolean | 'auto'
    globalVmOptions: string[]
    globalMcOptions: string[]
    globalFastLaunch: boolean
    globalHideLauncher: boolean
    globalShowLog: boolean
    globalDisableAuthlibInjector: boolean
    globalDisableElyByAuthlib: boolean
    globalPrependCommand: string
    globalPreExecuteCommand: string
    globalEnv: Record<string, string>
    globalResolution: { width?: number; height?: number; fullscreen?: boolean }
  }) {
    this.globalMinMemory = settings.globalMinMemory
    this.globalMaxMemory = settings.globalMaxMemory
    this.globalAssignMemory = settings.globalAssignMemory
    this.globalVmOptions = settings.globalVmOptions
    this.globalMcOptions = settings.globalMcOptions
    this.globalFastLaunch = settings.globalFastLaunch
    this.globalHideLauncher = settings.globalHideLauncher
    this.globalShowLog = settings.globalShowLog
    this.globalDisableAuthlibInjector = settings.globalDisableAuthlibInjector
    this.globalDisableElyByAuthlib = settings.globalDisableElyByAuthlib
    this.globalPrependCommand = settings.globalPrependCommand
    this.globalPreExecuteCommand = settings.globalPreExecuteCommand
    this.globalEnv = settings.globalEnv
    this.globalResolution = settings.globalResolution
  }
}
