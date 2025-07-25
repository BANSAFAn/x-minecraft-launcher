/* eslint-disable @typescript-eslint/no-redeclare */
import { Schema } from './schema'
import _SettingSchema from './SettingSchema.json'

export const SettingSchema: Schema<SettingSchema> = _SettingSchema

/* eslint-disable import/export  */
/* eslint-disable @typescript-eslint/no-var-requires */

export interface SettingSchema {
  /**
   * The display language of the launcher
   * @default ""
   */
  locale: string
  /**
   * Should launcher auto download new update
   * @default false
   */
  autoDownload: boolean
  /**
   * Should launcher auto install new update after app quit
   * @default false
   */
  autoInstallOnAppQuit: boolean
  /**
   * Should launcher show the pre-release
   * @default false
   */
  allowPrerelease: boolean
  /**
   * The download API set preferences
   * @default ""
   */
  apiSetsPreference: 'mojang' | 'bmcl' | ''
  /**
   * The supported unofficial api sets
   * @default []
   */
  apiSets: Array<{ name: string; url: string }>
  /**
   * Allow turn server in p2p
   * @default false
   */
  allowTurn: boolean
  /**
   * The http proxy address
   * @default ""
   */
  httpProxy: string
  /**
   * Is proxy setting enabled
   * @default false
   */
  httpProxyEnabled: boolean
  /**
   * The launcher theme
   * @default "dark"
   */
  theme: 'dark' | 'light' | 'system'
  /**
   * Maximum number of sockets to allow per host. Default for Node 0.10 is 5, default for Node 0.12 is Infinity
   * @default 64
   */
  maxSockets: number
  /**
   * Maximum number of sockets allowed for requesting API. Each request will use a new socket until the maximum is reached. Default: 16.
   * @default 16
   */
  maxAPISockets?: number
  /**
   * @default "legacy-only"
   */
  replaceNatives: 'all' | 'legacy-only' | false
  /**
   * @default 0
   */
  globalMinMemory: number
  /**
   * @default 0
   */
  globalMaxMemory: number
  /**
   * @default false
   */
  globalAssignMemory: boolean | 'auto'
  /**
   * @default []
   */
  globalVmOptions: string[]
  /**
   * @default []
   */
  globalMcOptions: string[]
  /**
   * @default false
   */
  globalFastLaunch: boolean
  /**
   * @default true
   */
  globalHideLauncher: boolean
  /**
   * @default false
   */
  globalShowLog: boolean
  /**
   * @default false
   */
  globalDisableAuthlibInjector: boolean
  /**
   * @default false
   */
  globalDisableElyByAuthlib: boolean
  /**
   * @default ""
   */
  globalPrependCommand: string
  /**
   * @default ""
   */
  globalPreExecuteCommand: string
  /**
   * The launch environment variables
   * @default {}
   */
  globalEnv: Record<string, string>
  /**
   * @default true
   */
  discordPresence: boolean
  /**
   * @default false
   */
  developerMode: boolean
  /**
   * @default false
   */
  disableTelemetry: boolean
  /**
   * @default false
   */
  linuxTitlebar: boolean
  /**
   * @default true
   */
  enableDedicatedGPUOptimization: boolean
  /**
   * Global resolution settings for Minecraft
   * @default {}
   */
  globalResolution: { width?: number; height?: number; fullscreen?: boolean }
  /**
   * The position of the sidebar
   * @default "left"
   */
  sidebarPosition: 'left' | 'right',

  /**
   * The text color for the UI
   * @default "#ffffff"
   */
  textColor: string,

        /**
         * The visible cards in the home page
         * @default ["mod", "resource-pack", "shader-pack", "save", "screenshots"]
         */
        visibleCards: string[]
}
