import { Field, ID, ObjectType } from 'type-graphql'
import { CardStatus } from './'

@ObjectType()
export class Guest {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field(() => CardStatus)
    public cardStatus: CardStatus
}
