import ipcRequest from '../utils/ipcRequest'

export function getProxyAddress() {
  return ipcRequest<string>('getProxyAddress', null)
}

export function exportCert() {
  return ipcRequest<string>('exportCert', null)
}
