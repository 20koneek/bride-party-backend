import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm'

import { Global } from '../../types/global'
import { BaseModel } from './BaseModel'
import { Product } from './Product'
import { ProductCheckInfo } from './ProductCheckInfo'
import { Retailer } from './Retailer'

@Entity()
@Index(['name'])
@Index(['name', 'status'])
@Index(['name', 'retailerId'], { unique: true })
@Index(['name', 'retailerId', 'status'])
export class ProductMapping extends BaseModel {

  @IsNotEmpty()
  @Column()
  public name: string

  @IsNotEmpty()
  @Column({ default: 'init', type: 'varchar' })
  public status: Global

  @IsNotEmpty()
  @Column({ name: 'retailer_id' })
  public retailerId: string

  @Column({ name: 'product_id' })
  public productId: string

  @ManyToOne(() => Retailer, ({ productMappings }) => productMappings)
  @JoinColumn({ name: 'retailer_id' })
  public retailer: Retailer

  @ManyToOne(() => Product, ({ productMappings }) => productMappings)
  @JoinColumn({ name: 'product_id' })
  public product: Product

  @OneToOne(() => ProductCheckInfo, ({ productMapping }) => productMapping)
  public productCheckInfo: ProductCheckInfo
}
