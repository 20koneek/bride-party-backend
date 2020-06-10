import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class UserInfo {

    @Field(() => ID)
    public id: string

    @Field()
    public firstName: string

    @Field()
    public lastName: string
}
