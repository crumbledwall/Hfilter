import { ipcResponse, ipcResponseSync } from '../common'
import { getProxyAddress, exportCert } from '../handlers/proxy'

export default function proxyRouter() {
  ipcResponse('getProxyAddress', getProxyAddress)
  ipcResponseSync('exportCert', exportCert)
}
