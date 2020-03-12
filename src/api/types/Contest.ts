import { Field, ID, ObjectType } from 'type-graphql'
import { Wedding } from './'

@ObjectType()
export class Contest {

    @Field(() => ID, { nullable: true })
    public id: string

    // @Field()
    // public name: string

    @Field(() => [Wedding])
    public weddings: Wedding[]
}
