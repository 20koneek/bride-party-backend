import { IsNotEmpty } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Категория товарта.',
})
export class ProductUnits {

  @Field(() => ID, {
    description: 'id объекта',
  })
  public id: string

  @IsNotEmpty()
  @Field()
  public name: string

  @Field({ nullable: true })
  public parentProductUnitId?: string
}
