import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Feed {

    @Field(() => ID)
    public id: string
}
