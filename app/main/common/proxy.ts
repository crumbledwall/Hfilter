import Proxy from 'http-mitm-proxy'
import { getConnection } from 'typeorm'
import { Proxy as ProxyModel } from '../model'

export default class ProxyServer {
  private static instance: ProxyServer
  private proxy: Proxy.IProxy

  private constructor() {
    this.proxy = Proxy()
    this.initProxy()
  }

  private async initProxy() {
    const config = await getConnection('default').getRepository('proxy').findOne() as ProxyModel
    this.proxy.listen({ host: config.host, port: config.port })
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ProxyServer()
    }
    return this.instance
  }

  public static getProxyAddress() {
    const options = this.instance.proxy.options
    return `http://${options.host}:${options.port}`
  }
}
