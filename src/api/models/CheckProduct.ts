import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Check } from './Check'
import { ProductCheckInfo } from './ProductCheckInfo'

@Entity()
export class CheckProduct extends BaseModel {

  @IsNotEmpty()
  @Column()
  public name: string

  @IsNotEmpty()
  @Column()
  public quantity: number

  @IsNotEmpty()
  @Column()
  public sum: number

  @IsNotEmpty()
  @Column()
  public price: number

  @IsNotEmpty()
  @Column({ name: 'check_id' })
  public checkId: string

  @IsNotEmpty()
  @ManyToOne(() => Check, ({ checkProducts }) => checkProducts)
  @JoinColumn({ name: 'check_id' })
  public check: Check

  @OneToOne(() => ProductCheckInfo, ({ checkProduct }) => checkProduct)
  public productCheckInfo: ProductCheckInfo
}
