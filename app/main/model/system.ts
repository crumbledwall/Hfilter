import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Proxy {
  @PrimaryColumn('text')
    host: string | undefined

  @Column('int')
    port: number | undefined

  @Column('text')
    protocol: string | undefined

  constructor(host: string | undefined, port: number | undefined
    , protocol: string | undefined) {
    this.host = host
    this.port = port
    this.protocol = protocol
  }
}
