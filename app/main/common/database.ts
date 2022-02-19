import { createConnection, Connection } from 'typeorm'
import { Proxy } from '../model'

export default class Database {
  public static connect = async(): Promise<Connection> => {
    return await createConnection({
      name: 'default',
      type: 'sqlite',
      database: 'hfilter.db',
      entities: [
        Proxy
      ],
      synchronize: true
    })
  }
  public static init = async(connection: Connection) => {
    const initConfig = {
      host: '0.0.0.0',
      port: 8080,
      protocol: 'http'
    }
    const proxyRepository = connection.getRepository(Proxy)
    const proxyConfig = await proxyRepository.find()
    if (proxyConfig.length === 0) {
      await proxyRepository.save(initConfig)
    }
  }
}
