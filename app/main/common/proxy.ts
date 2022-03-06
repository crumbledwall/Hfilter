import Proxy from 'http-mitm-proxy'
import { getConnection } from 'typeorm'
import { Proxy as ProxyModel, Domain } from '../model'
import { dialog } from 'electron'
import fs from 'fs'

export default class ProxyServer {
  private static instance: ProxyServer
  private proxy: Proxy.IProxy

  private constructor() {
    this.proxy = Proxy()
    this.init()
  }

  private async init() {
    const config = await getConnection('db').getRepository(ProxyModel).findOne()
    this.proxy.listen({
      host: config?.host,
      port: config?.port,
      sslCaDir: config?.dir
    })
    await this.loadRules()
  }

  public restart() {
    this.proxy.close()
    this.init()
  }

  private async loadRules() {
    const result = await getConnection('db').getRepository(Domain).find({ relations: ['rule'] })
    this.proxy.onRequest(function(ctx, callback) {
      ctx.use(Proxy.gunzip)
      result.forEach((value: Domain) => {
        if (value.name &&
        ctx.clientToProxyRequest.headers.host?.indexOf(value?.name) !== -1) {
          ctx.onResponseData(function(ctx, chunk, callback) {
            let content = chunk.toString()
            value.rule?.forEach((rule) => {
              if (rule.position === 'body') {
                switch (rule.type) {
                  case 'add':
                    content += rule.content
                    break
                  case 'replace':
                    if (rule.old && rule.new) {
                      content = content.replace(rule.old, rule.new)
                    }
                    break
                  case 'remove':
                    if (rule.old) {
                      content = content.replace(rule.old, '')
                    }
                    break
                  case 'raw':
                    if (rule.content) {
                      content = rule.content
                    }
                }
              }
            })
            return callback(undefined, Buffer.from(content))
          })
        }
      })

      return callback()
    })

    this.proxy.onResponseHeaders((ctx, callback) => {
      result.forEach((value: Domain) => {
        if (value.name &&
          ctx.clientToProxyRequest.headers.host?.indexOf(value?.name) !== -1) {
          value.rule?.forEach((rule) => {
            if (rule.position === 'header' && rule.key) {
              switch (rule.type) {
                case 'add':
                  ctx.serverToProxyResponse.headers[
                    rule.key?.toLowerCase()
                  ] = rule.content
                  break
                case 'replace':
                  ctx.serverToProxyResponse.headers[
                    rule.key?.toLowerCase()
                  ] = rule.content
                  break
                case 'remove':
                  delete ctx.serverToProxyResponse.headers[
                    rule.key?.toLowerCase()
                  ]
              }
            }
          })
        }
      })

      return callback()
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
              reject({ message: err.toString(), type: 'error' })
            }
            resolve({ message: 'Cert export successed.', type: 'success' })
          })
      })
    }
  }
}
