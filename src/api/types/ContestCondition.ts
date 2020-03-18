import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class ContestCondition {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string
}
