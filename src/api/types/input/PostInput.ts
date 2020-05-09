import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class PostInput {

    @IsNotEmpty()
    @Field()
    public message: string
}
