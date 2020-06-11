import { Field, InputType } from 'type-graphql'

@InputType()
export class ContestInput {

    @Field()
    public name: string
}
