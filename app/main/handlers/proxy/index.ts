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
  const newRule = {
    domain: rule.domain,
    position: rule.position,
    type: rule.type,
    key: rule.key,
    content: rule.content,
    old: rule.old,
    new: rule.new
  }
  const newDomain = {
    name: rule.domain,
    rule: [newRule]
  }

  const domain = await getConnection('db').getRepository('domain').find({
    'name': rule.domain
  })
  if (domain.length === 0) {
    await getConnection('db').getRepository('domain').save(newDomain)
  }
  await getConnection('db').getRepository('rule').save(newRule)

  ProxyServer.getInstance().restart()
  return { 'messgae': 'Rule add success' }
}
