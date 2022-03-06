import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Domain } from './domain'
@Entity('rule')
export class Rule {
  @PrimaryGeneratedColumn()
    id: number | undefined

  @Column('text')
    position: 'header' | 'body' | undefined

  @Column('text')
    type: 'replace' | 'add' | 'remove' | 'raw' | undefined

  @Column('text')
    old: string | undefined

  @Column('text')
    new: string | undefined

  @Column('text')
    key: string | undefined

  @Column('text')
    content: string | undefined

  @ManyToOne(() => Domain, domain => domain.name)
    domain: Domain | undefined
}
