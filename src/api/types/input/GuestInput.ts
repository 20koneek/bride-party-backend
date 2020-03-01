import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class GuestInput {

    @IsNotEmpty()
    @Field()
    public name: string
}
