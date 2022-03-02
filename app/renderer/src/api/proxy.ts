import ipcRequest from '../utils/ipcRequest'
import type { ResponseData } from '../utils/interface'

export function getProxyAddress() {
  return ipcRequest<string>('getProxyAddress', null)
}

export function exportCert() {
  return ipcRequest<ResponseData>('exportCert', null)
}

export function addRule(rule: any) {
  return ipcRequest<string>('addRule', rule)
}
