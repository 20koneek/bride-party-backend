import { IsNotEmpty } from 'class-validator'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Товар.',
})
export class ProductBarcode {

  @IsNotEmpty()
  @Field(() => ID)
  public id: string

  @IsNotEmpty()
  @Field()
  public barcode: string

  @IsNotEmpty()
  @Field(() => Int)
  public queryCount: number

  @IsNotEmpty()
  @Field()
  public name: string

  @IsNotEmpty()
  @Field({ nullable: true })
  public productId?: string
}
