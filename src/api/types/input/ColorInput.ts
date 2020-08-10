import { Field, InputType } from 'type-graphql'

@InputType()
export class ColorInput {

    @Field()
    public name: string

    @Field()
    public value: string
}
