import { Field, ObjectType } from 'type-graphql'
import { PageInfo } from '../PageInfo'
import { Check } from './Check'

@ObjectType()
export class CheckPaginate {

  @Field(() => [Check])
  public checks: Check[]

  @Field(() => PageInfo)
  public pageInfo: PageInfo
}
