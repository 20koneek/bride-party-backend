import { Field, ID, Int, ObjectType } from 'type-graphql'
import { ContestCondition, Status } from './'

@ObjectType()
export class Payment {

    @Field(() => ID)
    public id: string

    @Field(() => Int)
    public amount: number

    @Field(() => Status)
    public status: Status

    @Field(() => ContestCondition)
    public contestCondition?: ContestCondition
}
