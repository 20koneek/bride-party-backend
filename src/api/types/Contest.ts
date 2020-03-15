import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class Contest {

    @Field(() => ID, { nullable: true })
    public id: string

    @Field()
    public name: string
}
