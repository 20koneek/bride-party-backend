import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class UserInfo {

    @Field()
    public firstName: string

    @Field()
    public lastName: string

    @Field()
    public secondName: string
}
