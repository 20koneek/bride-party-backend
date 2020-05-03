import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Post {

    @Field(() => ID)
    public id: string

    @Field()
    public message: string
}
