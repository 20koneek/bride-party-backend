import { Field, ID, ObjectType } from 'type-graphql'
import { GuestCard } from './'

@ObjectType()
export class Guest {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field(() => GuestCard, { nullable: true })
    public card?: GuestCard
}
