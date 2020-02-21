import { Field, ObjectType } from 'type-graphql'
import { Guest } from '../Guest'
import { Check } from './Check'

@ObjectType()
export class CheckPaginate {

  @Field(() => [Check])
  public checks: Check[]

  @Field(() => Guest)
  public pageInfo: Guest
}
