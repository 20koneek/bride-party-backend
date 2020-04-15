import { Field, ID, ObjectType } from 'type-graphql'
import { ContestCondition } from './'

@ObjectType()
export class Contest {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field(() => [ContestCondition])
    public conditions: ContestCondition[]
}
