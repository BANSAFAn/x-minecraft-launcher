import { IS_DEV } from '@/constant'
import multiplayerPreload from '@preload/multiplayer'
import { BrowserWindow, nativeTheme } from 'electron'
import { ElectronController } from '../ElectronController'
import { createWindowTracker } from '../utils/windowSizeTracker'

export async function openMultiplayerWindow(this: ElectronController) {
  if (!this.multiplayerRef || this.multiplayerRef.isDestroyed()) {
    const man = this.activatedManifest!
    const tracker = createWindowTracker(this.app, 'multiplayer', man)
    const config = await tracker.getConfig()

    const win = new BrowserWindow({
      icon: nativeTheme.shouldUseDarkColors ? man.iconSets.darkIcon : man.iconSets.icon,
      titleBarStyle: this.getTitlebarStyle(),
      trafficLightPosition: this.app.platform.os === 'osx' ? { x: 14, y: 10 } : undefined,
      minWidth: 400,
      minHeight: 600,
      width: config.getWidth(400, 400),
      height: config.getHeight(600, 600),
      x: config.x,
      y: config.y,
      show: false,
      frame: this.getFrameOption(),

      webPreferences: {
        session: this.app.session.getSession(this.activatedManifest!.url),
        contextIsolation: true,
        sandbox: false,
        preload: multiplayerPreload,
        devTools: IS_DEV,
      },
    })

    tracker.track(win)

    const url = new URL(man.url)
    url.pathname = '/app.html'
    win.loadURL(url.toString())
    this.onWebContentCreateWindow(win)
    win.once('ready-to-show', () => {
      win.show()
    })
    win.on('close', (e) => {
      if (this.mainWin && !this.mainWin.isDestroyed()) {
        win.hide()
        e.preventDefault()
      }
    })
    this.multiplayerRef = win
  } else {
    this.multiplayerRef.show()
    this.multiplayerRef.focus()
  }
}