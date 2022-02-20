import Proxy from 'http-mitm-proxy'
import { getConnection } from 'typeorm'
import { Proxy as ProxyModel } from '../model'
import { dialog } from 'electron'
import fs from 'fs'

export default class ProxyServer {
  private static instance: ProxyServer
  private proxy: Proxy.IProxy

  private constructor() {
    this.proxy = Proxy()
    this.initProxy()
  }

  private async initProxy() {
    const config = await getConnection('default').getRepository('proxy').findOne() as ProxyModel
    this.proxy.listen({
      host: config.host,
      port: config.port,
      sslCaDir: config.dir
    })
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

  public static exportCert() {
    const file = dialog.showSaveDialogSync(
      {
        defaultPath: '~/HfilterCA.pem',
        filters: [
          { name: 'PEM certificate', extensions: ['pem'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      }
    )
    if (file) {
      return new Promise((resolve, reject) => {
        fs.copyFile(`${this.instance.proxy.sslCaDir}/certs/ca.pem`,
          file, function(err) {
            if (err) {
              reject(err.toString())
              resolve('Cert export successed.')
            }
          })
      })
    }
  }
}
