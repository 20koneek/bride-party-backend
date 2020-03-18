import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Payment, PaymentInput } from '../types'
import { PaymentService } from '../services'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'

@Service()
@Resolver(() => Payment)
export class PaymentResolver {

    constructor(
        private service: PaymentService,
    ) {
    }

    @Mutation(() => Payment)
    @UseMiddleware(CurrentGuestMiddleware)
    public async pay(
        @Ctx() { currentGuest }: Context,
        @Arg('input') { amount, contestConditionId }: PaymentInput,
    ): Promise<Payment> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return await this.service.create({
            amount,
            contestConditionId,
            guestId: currentGuest.id,
        })
    }
}