import { IsNotEmpty } from 'class-validator'
import { Field, InputType } from 'type-graphql'

@InputType()
export class PaymentInput {

    @IsNotEmpty()
    @Field()
    public amount: number

    @IsNotEmpty()
    @Field()
    public contestConditionId: string
}
