import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Guest {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string
}
