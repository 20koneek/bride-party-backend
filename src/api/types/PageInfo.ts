import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Check object.',
})
export class PageInfo {
  @Field(() => Int)
  public page: number

  @Field(() => Int)
  public perPage: number

  @Field(() => Int)
  public totalCount: number
}
