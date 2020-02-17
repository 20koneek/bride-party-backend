import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Product } from './Product'

@Entity()
@Index(['barcode'])
@Index(['queryCount'])
export class ProductBarcode extends BaseModel {

  @IsNotEmpty()
  @Column()
  public barcode: string

  @IsNotEmpty()
  @Column()
  public name: string

  @IsNotEmpty()
  @Column({ name: 'query_count', type: 'integer' })
  public queryCount: number

  @Column({ name: 'product_id', nullable: true })
  public productId?: string

  @OneToOne(
    () => Product,
    ({ productBarcode }) => productBarcode,
    {
      lazy: true,
    },
  )
  @JoinColumn({ name: 'product_id' })
  public product?: Product
}
