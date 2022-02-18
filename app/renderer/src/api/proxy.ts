import ipcRequest from '../utils/ipcRequest'

export function getProxyAddress() {
  return ipcRequest<string>('getProxyAddress', null)
}
