import { Field, ID, Int, ObjectType } from 'type-graphql'
import { ContestCondition } from './'

@ObjectType()
export class Payment {

    @Field(() => ID)
    public id: string

    @Field(() => Int)
    public amount: number

    @Field()
    public status: string

    @Field(() => ContestCondition)
    public contestCondition: ContestCondition
}
