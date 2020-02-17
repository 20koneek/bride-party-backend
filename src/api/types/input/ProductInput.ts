import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType({
  description: 'Товар.',
})
export class ProductInput {

  // @IsNotEmpty()
  // @Field()
  // public name: string
  //
  // @Field()
  // public parentProductUnitId?: string

  @IsNotEmpty()
  @Field()
  public name: string

  @IsNotEmpty()
  @Field()
  public netWeight: number

  @IsNotEmpty()
  @Field({ name: 'product_unit_id', nullable: true })
  public productUnitId?: string

  // @ManyToOne(() => ProductUnit, ({ products }) => products)
  // @JoinColumn({ name: 'product_unit_id' })
  // public productUnit: ProductUnit
  //
  // @OneToMany(() => ProductMapping, ({ product }) => product)
  // public productMappings: ProductMapping[]
  //
  // @OneToOne(() => ProductCheckInfo, ({ product }) => product)
  // public productCheckInfo: ProductCheckInfo
  //
  // @OneToOne(() => ProductBarcode, ({ product }) => product)
  // public barcodeProduct: ProductBarcode
}
