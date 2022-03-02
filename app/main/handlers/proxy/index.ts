import ProxyServer from '../../common/proxy'
import { Rule } from '../../model'
import { getConnection } from 'typeorm'

export function getProxyAddress() {
  return ProxyServer.getProxyAddress()
}

export async function exportCert() {
  return await ProxyServer.exportCert()
}

export async function addRule(rule: Rule) {
  await getConnection('db').getRepository('rule').save(rule)
  // return ProxyServer.getInstance().restart()
  return 'debug ok'
}
