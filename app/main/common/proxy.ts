import Proxy from 'http-mitm-proxy'

export default class ProxyServer {
  private static instance: ProxyServer = new ProxyServer()
  private proxy: Proxy.IProxy

  private constructor() {
    this.proxy = Proxy()
    this.proxy.listen({ host: '0.0.0.0', port: 5050 })
  }

  public static getInstance() {
    return this.instance
  }
}
