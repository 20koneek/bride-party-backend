import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class WeddingInfo {

    @Field(() => ID)
    public id: string

    @Field()
    public title: string
}
