import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Product } from './Product'

@Entity()
@Index(['name'])
export class ProductUnit extends BaseModel {

  @IsNotEmpty()
  @Column()
  public name: string

  @Column({ name: 'parent_product_unit_id' })
  public parentProductUnitId?: string

  @Column({ name: 'use_for_product' })
  public useForProduct: boolean

  @ManyToOne(
    () => ProductUnit,
    ({ productUnits }) => productUnits,
    {
      lazy: true,
    },
  )
  @JoinColumn({ name: 'parent_product_unit_id' })
  public parentProductUnit: ProductUnit

  @OneToMany(
    () => ProductUnit,
    ({ parentProductUnit }) => parentProductUnit,
    {
      lazy: true,
    },
  )
  public productUnits: ProductUnit[]

  @OneToMany(() => Product, ({ productUnit }) => productUnit, {
    lazy: true,
  })
  public products: Product[]
}
