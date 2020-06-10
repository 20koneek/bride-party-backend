import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInfoInput {

    @Field()
    public firstName: string

    @Field()
    public lastName: string
}
