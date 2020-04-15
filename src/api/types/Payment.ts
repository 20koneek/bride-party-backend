import { Field, ID, Int, ObjectType } from 'type-graphql'
import { ContestCondition, PaymentStatus } from './'

@ObjectType()
export class Payment {

    @Field(() => ID)
    public id: string

    @Field(() => Int)
    public amount: number

    @Field(() => PaymentStatus)
    public status: PaymentStatus

    @Field(() => ContestCondition)
    public contestCondition?: ContestCondition
}
