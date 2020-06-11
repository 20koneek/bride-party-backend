import { Field, InputType } from 'type-graphql'

@InputType()
export class WeddingInput {

    @Field()
    public name: string
}
