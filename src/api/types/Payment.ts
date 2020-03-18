import { Field, ID, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class Payment {

    @Field(() => ID)
    public id: string

    @Field(() => Int)
    public amount: number
}
