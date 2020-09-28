import { Field, ID, ObjectType } from 'type-graphql'
import { ColorStatus } from './enums'

@ObjectType()
export class Color {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field()
    public value: string

    @Field(() => Color)
    public status: ColorStatus
}
