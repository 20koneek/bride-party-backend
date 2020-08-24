import { Field, ID, ObjectType } from 'type-graphql'
import { Color } from './'

@ObjectType()
export class ContestCondition {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field(() => Color)
    public color: Color
}
