import { HAS_DEV_SERVER, IS_DEV } from '@/constant'
import indexPreload from '@preload/index'
import { kSettings } from '@xmcl/runtime/settings'
import { BrowserWindow, nativeTheme } from 'electron'
import { ElectronController } from '../ElectronController'
import { createWindowTracker } from '../utils/windowSizeTracker'

export async function createAppWindow(this: ElectronController, isBootstrap: boolean) {
  const man = this.activatedManifest!
  const tracker = createWindowTracker(this.app, 'app-manager', man)
  const config = await tracker.getConfig()
  const restoredSession = this.app.session.getSession(man.url)
  const minWidth = man.minWidth ?? 800
  const minHeight = man.minHeight ?? 600
  const defaultWidth = man.defaultWidth ?? 800
  const defaultHeight = man.defaultHeight ?? 600
  this.settings = await this.app.registry.get(kSettings)
  const transparent = this.settings.transparentBackground ?? false
  const browser = new BrowserWindow({
    title: man.name,
    width: config.getWidth(defaultWidth, minWidth),
    height: config.getHeight(defaultHeight, minHeight),
    x: config.x,
    y: config.y,
    minWidth: man.minWidth,
    minHeight: man.minHeight,
    frame: this.getFrameOption(),
    transparent,
    backgroundColor: transparent ? '#00000000' : man.backgroundColor,
    vibrancy: transparent ? undefined : (man.vibrancy ? 'sidebar' : undefined),
    icon: nativeTheme.shouldUseDarkColors ? man.iconSets.darkIcon : man.iconSets.icon,
    titleBarStyle: this.getTitlebarStyle(),
    trafficLightPosition: this.app.platform.os === 'osx' ? { x: 14, y: 10 } : undefined,
    webPreferences: {
      preload: indexPreload,
      session: restoredSession,
      webviewTag: true,
    },
    show: false,
  })
  if (man.ratio) {
    browser.setAspectRatio(minWidth / minHeight)
  }

  browser.on('ready-to-show', () => {
    this.logger.log('App Window is ready to show!')

    if (man.vibrancy && !transparent) {
      this.setWindowBlurEffect(browser)
    }
    if (config.maximized) {
      browser.maximize()
    }
    if (!this.app.deferredWindowOpen) {
      browser.show()
      browser.focus()
    }
  })
  browser.webContents.on('will-navigate', this.onWebContentWillNavigate)
  browser.webContents.on('did-create-window', this.onWebContentCreateWindow)
  browser.webContents.setWindowOpenHandler(this.windowOpenHandler)
  browser.on('closed', () => {
    this.mainWin = undefined
    this.multiplayerRef?.close()
  })

  this.setupBrowserLogger(browser, 'app')
  tracker.track(browser)

  const url = new URL(man.url)
  if (isBootstrap) {
    url.searchParams.append('bootstrap', 'true')
  }
  if (this.migrated) {
    url.searchParams.append('from', this.migrated.from)
    url.searchParams.append('to', this.migrated.to)
  }
  this.logger.log(url.toString())
  browser.loadURL(url.toString())

  this.logger.log(`Load main window url ${url.toString()}`)

  this.mainWin = browser
  browser.on('maximize', () => {
    this.maximized = true
  })
  browser.on('unmaximize', () => {
    this.maximized = false
  })

  this.app.emit('app-booted', man)
}