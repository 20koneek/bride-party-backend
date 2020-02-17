import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType({
  description: 'Категория товарта.',
})
export class ProductUnitInput {

  @IsNotEmpty()
  @Field({
    description: 'Check object.',
  })
  public name: string

  @Field({
    description: 'Check object.',
    nullable: true,
  })
  public parentProductUnitId?: string
}
