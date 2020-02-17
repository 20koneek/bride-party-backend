import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm'

import { BaseModel } from './BaseModel'
import { CheckProduct } from './CheckProduct'
import { Product } from './Product'
import { ProductMapping } from './ProductMapping'

@Entity()
@Index(['checkProductId'], { unique: true })
export class ProductCheckInfo extends BaseModel {

  @IsNotEmpty()
  @Column()
  public price: number

  @IsNotEmpty()
  @Column({ name: 'gross_price' })
  public grossPrice: number

  @IsNotEmpty()
  @Column({ name: 'check_product_id' })
  public checkProductId: string

  @Column({ name: 'product_id' })
  public productId: string

  @Column({ name: 'product_mapping_id' })
  public productMappingId: string

  @OneToOne(() => CheckProduct, ({ productCheckInfo }) => productCheckInfo)
  @JoinColumn({ name: 'check_product_id' })
  public checkProduct: CheckProduct

  @OneToOne(() => Product, ({ productCheckInfo }) => productCheckInfo)
  @JoinColumn({ name: 'product_id' })
  public product: Product

  @OneToOne(() => ProductMapping, ({ productCheckInfo }) => productCheckInfo)
  @JoinColumn({ name: 'product_mapping_id' })
  public productMapping: ProductMapping
}
