import { AccentState, HAS_DEV_SERVER, HOST, IS_DEV, WindowsBuild } from '@/constant'
import indexPreload from '@preload/index'
import { BrowserWindow, Event, HandlerDetails, nativeTheme, shell } from 'electron'
import { ElectronController } from '../ElectronController'

export function onWebContentCreateWindow(this: ElectronController, window: BrowserWindow) {
  window.webContents.setWindowOpenHandler(this.windowOpenHandler)
  window.webContents.on('will-navigate', this.onWebContentWillNavigate)
  window.webContents.on('did-create-window', this.onWebContentCreateWindow)
  window.once('ready-to-show', () => {
    window.show()
  })
}

export function onWebContentWillNavigate(this: ElectronController, event: Event, url: string) {
  if (!url.startsWith(HAS_DEV_SERVER ? 'http://localhost' : ('http://' + HOST))) {
    event.preventDefault()
    shell.openExternal(url)
  }
}

export function windowOpenHandler(this: ElectronController, detail: HandlerDetails) {
  const url = new URL(detail.url)
  const features = detail.features.split(',')
  const width = parseInt(features.find(f => f.startsWith('width'))?.split('=')[1] ?? '1024', 10)
  const height = parseInt(features.find(f => f.startsWith('height'))?.split('=')[1] ?? '768', 10)
  const minWidth = parseInt(features.find(f => f.startsWith('min-width'))?.split('=')[1] ?? '600', 10)
  const minHeight = parseInt(features.find(f => f.startsWith('min-height'))?.split('=')[1] ?? '600', 10)
  const man = this.activatedManifest!
  if (url.host === 'app' || detail.frameName === 'app' || (url.host.startsWith('localhost') && HAS_DEV_SERVER)) {
    return {
      action: 'allow',
      overrideBrowserWindowOptions: {
        vibrancy: man.vibrancy ? 'sidebar' : undefined, // or popover
        icon: nativeTheme.shouldUseDarkColors ? man.iconSets.darkIcon : man.iconSets.icon,
        titleBarStyle: this.getTitlebarStyle(),
        trafficLightPosition: this.app.platform.os === 'osx' ? { x: 14, y: 10 } : undefined,
        minWidth,
        minHeight,
        width,
        height,
        show: false,
        frame: this.getFrameOption(),

        webPreferences: {
          preload: indexPreload,
          devTools: IS_DEV,
        },
      },
    }
  }

  shell.openExternal(detail.url)
  return { action: 'deny' }
}

export function setupBrowserLogger(this: ElectronController, ref: BrowserWindow, name: string) {
  const logger = this.app.getLogger(name, name)
  ref.webContents.on('console-message', (e, level, message, line, id) => {
    if (message.startsWith("Listener added for a synchronous 'DOMNodeRemoved' DOM Mutation Event. This event type is deprecated")) {
      return
    }
    if (level === 1) {
      logger.log(message)
    } else if (level === 2) {
      logger.warn(message)
    } else if (level === 3) {
      logger.warn(message)
    }
  })
  ref.once('close', () => {
    ref.webContents.removeAllListeners('console-message')
  })
}

export function setWindowBlurEffect(this: ElectronController, browser: BrowserWindow) {
  const isWin = this.app.platform.os === 'windows'
  if (isWin && this.app.windowsUtils) {
    const handle = browser.getNativeWindowHandle()
    const windowsVersion = this.windowsVersion
    if (windowsVersion) {
      if (windowsVersion.build >= WindowsBuild.Windows11) {
        this.app.windowsUtils.setMica(handle.buffer, true)
        this.logger.log(`Set window Mica ${handle.toString('hex')}`)
      } else {
        let blur: AccentState
        if (windowsVersion.build >= WindowsBuild.Windows10Build1903) {
          blur = AccentState.ACCENT_ENABLE_BLURBEHIND
        } else if (windowsVersion.build >= WindowsBuild.Windows10Build1809) {
          blur = AccentState.ACCENT_ENABLE_ACRYLICBLURBEHIND
        } else if (windowsVersion.build >= WindowsBuild.Windows10) {
          blur = AccentState.ACCENT_ENABLE_BLURBEHIND
        } else {
          blur = AccentState.ACCENT_ENABLE_TRANSPARENTGRADIENT
        }
        if (this.app.windowsUtils.setWindowBlur(handle.buffer, blur)) {
          this.logger.log(`Set window Acrylic transparent ${handle.toString('hex')}`)
        } else {
          this.logger.warn(`Set window Acrylic failed ${handle.toString('hex')}`)
        }
      }
    }
  }
}