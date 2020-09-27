import { Field, ID, ObjectType } from 'type-graphql'
import { Role } from './enums'

@ObjectType()
export class UserInfo {

    @Field(() => ID)
    public id: string

    @Field()
    public firstName: string

    @Field()
    public lastName: string

    @Field(() => Role)
    public role: Role
}
