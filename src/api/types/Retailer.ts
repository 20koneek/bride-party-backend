import { IsNotEmpty } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Retailer object.',
})
export class Retailer {
  @Field(() => ID)
  public id: string

  @Field({
    description: 'inn',
  })
  public inn: string

  @IsNotEmpty()
  @Field({
    description: 'name',
  })
  public name: string
}
