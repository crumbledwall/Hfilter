import { ipcResponse } from '../common'
import { getProxyAddress } from '../handlers/proxy'

export default function proxyRouter() {
  ipcResponse('getProxyAddress', getProxyAddress)
}
