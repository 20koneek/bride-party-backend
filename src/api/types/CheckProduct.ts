import { IsNotEmpty } from 'class-validator'
import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Check object.',
})
export class CheckProduct {

  @Field(() => ID)
  public id: string

  @Field()
  @IsNotEmpty()
  public name: string

  @Field(() => Int)
  @IsNotEmpty()
  public quantity: number

  @Field(() => Int)
  @IsNotEmpty()
  public sum: number

  @Field(() => Int)
  @IsNotEmpty()
  public price: number
}
