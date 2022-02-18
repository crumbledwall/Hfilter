import mainRouter from './mainRouter'
import proxyRouter from './proxyRouter'

export default function startRouter() {
  mainRouter()
  proxyRouter()
}
