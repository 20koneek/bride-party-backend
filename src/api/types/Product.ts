import { IsNotEmpty } from 'class-validator'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Категория товарта.',
})
export class Product {

  @Field(() => ID, {
    description: 'id объекта',
  })
  public id: string

  @Field()
  @IsNotEmpty()
  public name: string

  @Field(() => Int)
  @IsNotEmpty()
  public netWeight: number

  @Field()
  @IsNotEmpty()
  public status: string

  // @IsNotEmpty()
  // @Column({ name: 'product_unit_id' })
  // public productUnitId?: string
}
