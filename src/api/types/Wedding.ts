import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Wedding {

    @Field(() => ID)
    public id: string

    @Field()
    public title: string

    @Field()
    public description: string

    @Field()
    public startDate: Date

    @Field()
    public endDate: Date
}
