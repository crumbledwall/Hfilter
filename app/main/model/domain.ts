import { Entity, PrimaryColumn, OneToMany } from 'typeorm'
import { Rule } from './rule'

@Entity('domain')
export class Domain {
  @PrimaryColumn('text')
    name: string | undefined

  @OneToMany(() => Rule, rule => rule.domain)
    rule: Rule[] | undefined
}
