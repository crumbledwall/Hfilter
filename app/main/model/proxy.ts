import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('proxy')
export class Proxy {
  @PrimaryColumn('text')
    host: string | undefined

  @Column('int')
    port: number | undefined

  @Column('text')
    dir: string | undefined

  constructor(host: string | undefined, port: number | undefined
    , dir: string | undefined) {
    this.host = host
    this.port = port
    this.dir = dir
  }
}
