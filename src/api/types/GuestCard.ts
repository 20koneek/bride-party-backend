import { Field, ID, ObjectType } from 'type-graphql'
import { CardStatus } from './'

@ObjectType()
export class GuestCard {

    @Field(() => ID)
    public id: string

    @Field(() => CardStatus)
    public status: CardStatus
}
