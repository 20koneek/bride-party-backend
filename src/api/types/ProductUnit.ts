import { IsNotEmpty } from 'class-validator'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Категория товарта.',
})
export class ProductUnit {

  @Field(() => ID, {
    description: 'id объекта',
  })
  public id: string

  @IsNotEmpty()
  @Field()
  public name: string

  @Field(() => [ProductUnit], {
    description: 'Список подкатегорий',
  })
  public productUnits: ProductUnit[]

  @Field(() => ProductUnit, { nullable: true })
  public parentProductUnit?: ProductUnit
}
