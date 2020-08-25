import { Field, InputType } from 'type-graphql'

@InputType()
export class ContestConditionInput {

    @Field()
    public name: string

    @Field()
    public contestId: string

    @Field()
    public colorId: string
}
