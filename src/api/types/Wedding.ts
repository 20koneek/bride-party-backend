import { Field, ID, ObjectType } from 'type-graphql'
import { Contest } from './'

@ObjectType()
export class Wedding {

    @Field(() => ID)
    public id: string

    @Field()
    public name: string

    @Field(() => [Contest])
    public contests: Contest[]
}
