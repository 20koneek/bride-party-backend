import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Color {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field()
    public value: string
}
