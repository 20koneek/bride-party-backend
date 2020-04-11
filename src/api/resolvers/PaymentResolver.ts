import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Payment, PaymentInput, Status } from '../types'
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

    @Query(() => [Payment])
    @UseMiddleware(CurrentGuestMiddleware)
    public async currentPayments(
        @Ctx() { currentGuest }: Context,
    ): Promise<Payment[]> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return await this.service.all({ guestId: currentGuest.id })
    }

    @Mutation(() => Payment)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createPayment(
        @Ctx() { currentGuest }: Context,
        @Arg('input') { amount, conditionId }: PaymentInput,
    ): Promise<Payment> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return await this.service.create({
            amount,
            conditionId,
            guestId: currentGuest.id,
        })
    }

    @Mutation(() => Payment)
    @UseMiddleware(CurrentGuestMiddleware)
    public async updatePaymentStatus(
        @Ctx() { currentGuest }: Context,
        @Arg('id') id: string,
        @Arg('status', () => Status) status: Status,
    ): Promise<Payment> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return await this.service.updateStatus(id, status)
    }
}
