import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class Rule {
  @PrimaryColumn('text')
    domain: string | undefined

  @Column('text')
    position: 'header' | 'body' | undefined

  @Column('text')
    type: 'replace' | 'add' | 'remove' | 'raw' | undefined

  @Column('text')
    old: string | undefined

  @Column('text')
    new: string | undefined

  @Column('text')
    content: string | undefined
}
