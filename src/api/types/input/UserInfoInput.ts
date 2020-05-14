import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserInfoInput {

    @Field()
    public firstName: string

    @Field()
    public lastName: string

    @Field()
    public secondName: string
}
