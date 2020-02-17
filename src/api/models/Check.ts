import { IsNotEmpty } from 'class-validator'
import { Moment } from 'moment'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { CheckParam } from './CheckParam'
import { CheckProduct } from './CheckProduct'
import { Store } from './Store'
import { Retailer } from './Retailer'

@Entity()
export class Check extends BaseModel {

  @IsNotEmpty()
  @Column({
    name: 'name',
    length: '255',
  })
  public name: string

  @Column({
    name: 'date_time',
    type: 'timestamp',
  })
  public dateTime: Moment

  @IsNotEmpty()
  @Column({
    name: 'total_sum',
    type: 'integer',
  })
  public totalSum: number

  @Column()
  @IsNotEmpty()
  public status: string

  @IsNotEmpty()
  @OneToOne(() => CheckParam, ({ check }) => check, {
    lazy: true,
  })
  public checkParam: CheckParam

  @OneToMany(() => CheckProduct, ({ check }) => check, {
    lazy: true,
    cascade: true,
  })
  public checkProducts: CheckProduct[]

  @Column({
    name: 'store_id',
    nullable: true,
  })
  public storeId?: string

  @OneToOne(() => Store, ({ checks }) => checks, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'store_id' })
  public store?: Store

  @IsNotEmpty()
  @Column({
    name: 'retailer_id',
    nullable: true,
  })
  public retailerId?: string

  @OneToMany(() => Retailer, ({ checks }) => checks, {
    lazy: true,
    nullable: true,
  })
  @JoinColumn({ name: 'retailer_id' })
  public retailer?: Retailer
}
