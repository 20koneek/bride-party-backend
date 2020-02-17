import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'

import { BaseModel } from './BaseModel'
import { ProductCheckInfo } from './ProductCheckInfo'
import { ProductMapping } from './ProductMapping'
import { ProductUnit } from './ProductUnit'
import { ProductBarcode } from './ProductBarcode'

@Entity()
@Index(['name'])
export class Product extends BaseModel {

  @IsNotEmpty()
  @Column()
  public name: string

  @IsNotEmpty()
  @Column({ name: 'net_weight', default: () => 1 })
  public netWeight: number

  @Column()
  @IsNotEmpty()
  public status: string

  @IsNotEmpty()
  @Column({ name: 'product_unit_id' })
  public productUnitId?: string

  @ManyToOne(() => ProductUnit, ({ products }) => products)
  @JoinColumn({ name: 'product_unit_id' })
  public productUnit: ProductUnit

  @OneToMany(() => ProductMapping, ({ product }) => product)
  public productMappings: ProductMapping[]

  @OneToOne(() => ProductCheckInfo, ({ product }) => product)
  public productCheckInfo: ProductCheckInfo

  @OneToOne(() => ProductBarcode, ({ product }) => product)
  public productBarcode: ProductBarcode
}
