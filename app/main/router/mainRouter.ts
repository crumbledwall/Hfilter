import { ipcResponse } from '../common'
import { hello } from '../handlers/main'

export default function mainRouter() {
  ipcResponse('helloReq', 'helloRes', hello)
}
