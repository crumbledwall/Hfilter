import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Rule } from './rule'

@Entity()
export class Domain {
  @PrimaryGeneratedColumn()
    id: number | undefined

  @Column('text')
    domain: string | undefined

  @ManyToOne(() => Rule, rule => rule.domain)
    rule: Rule | undefined
}
