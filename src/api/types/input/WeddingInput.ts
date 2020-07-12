import { Field, InputType } from 'type-graphql'

@InputType()
export class WeddingInput {

    @Field()
    public title: string

    @Field()
    public description: string

    @Field()
    public startDate: Date

    @Field()
    public endDate: Date
}
