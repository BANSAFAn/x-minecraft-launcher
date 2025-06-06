import { Session, session } from 'electron'
import { existsSync } from 'fs'
import { createReadStream } from 'fs-extra'
import { join } from 'path'
import { Readable } from 'stream'
import ElectronLauncherApp from './ElectronLauncherApp'
import { HAS_DEV_SERVER, HOST } from './constant'

export class ElectronSession {
  private cached: Record<string, Session> = {}
  private proxy: string = ''

  constructor(private app: ElectronLauncherApp) { }

  #resolve(url: string): Session {
    const parsed = new URL(url)
    if (parsed.hostname === HOST) {
      if (existsSync(join(this.app.appDataPath, 'Partitions', 'main'))) {
        return session.fromPartition('persist:main')
      } else {
        return session.defaultSession
      }
    }
    return session.fromPartition(`persist:${parsed.hostname}`)
  }

  setProxy(proxy: string) {
    this.proxy = proxy

    for (const [, sess] of Object.entries(this.cached)) {
      sess.setProxy(proxy ? { proxyRules: proxy } : { mode: 'system' })
    }
  }

  getSession(url: string) {
    if (this.cached[url]) {
      return this.cached[url]
    }

    const ua = this.app.userAgent
    const sess = this.#resolve(url)

    sess.setUserAgent(ua)
    sess.setProxy(this.proxy ? { proxyRules: this.proxy } : { mode: 'system' })

    if (sess !== session.defaultSession) {
      for (const e of session.defaultSession.getAllExtensions()) {
        sess.loadExtension(e.path)
      }
    }

    const handler = async (request: Request): Promise<Response> => {
      const url = new URL(request.url)
      if (url.host === HOST && !HAS_DEV_SERVER) {
        const realPath = join(__dirname, 'renderer', url.pathname)
        const mimeType =
          url.pathname.endsWith('.js')
            ? 'text/javascript'
            : url.pathname.endsWith('.css')
              ? 'text/css'
              : url.pathname.endsWith('.html')
                ? 'text/html'
                : url.pathname.endsWith('.json')
                  ? 'application/json'
                  : url.pathname.endsWith('.png')
                    ? 'image/png'
                    : url.pathname.endsWith('.svg')
                      ? 'image/svg+xml'
                      : url.pathname.endsWith('.ico')
                        ? 'image/x-icon'
                        : url.pathname.endsWith('.woff')
                          ? 'font/woff'
                          : url.pathname.endsWith('.woff2')
                            ? 'font/woff2'
                            : url.pathname.endsWith('.ttf')
                              ? 'font/ttf'
                              // webp
                              : url.pathname.endsWith('.webp') ? 'image/webp' : ''
        return new Response(Readable.toWeb(createReadStream(realPath)) as any, {
          headers: {
            'Content-Type': mimeType,
          },
        })
      }
      request.headers.append('User-Agent', ua)

      const headers = {} as Record<string, string>
      request.headers.forEach((value, key) => {
        headers[key] = value
      })

      const response = await this.app.protocol.handle({
        url: new URL(url),
        method: request.method,
        headers: headers,
        body: request.body ? Readable.fromWeb(request.body as any) : request.body as any,
      })

      response.headers['access-control-allow-origin'] = ['*']

      return new Response(response.body instanceof Readable ? Readable.toWeb(response.body) as any : response.body, {
        status: response.status,
        headers: response.headers,
      })
    }

    sess.protocol.handle('http', handler)
    sess.protocol.handle('https', handler)

    this.cached[url] = sess

    return sess
  }
}
