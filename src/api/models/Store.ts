import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Check } from './Check'
import { Retailer } from './Retailer'

@Entity()
@Index(['address'])
export class Store extends BaseModel {

  @IsNotEmpty()
  @Column()
  public address: string

  @IsNotEmpty()
  @Column({ name: 'retailer_id' })
  public retailerId: string

  @IsNotEmpty()
  @ManyToOne(() => Retailer, ({ stores }) => stores)
  @JoinColumn({ name: 'retailer_id' })
  public retailer: Retailer

  @OneToMany(() => Check, ({ store }) => store)
  public checks: Check[]
}
