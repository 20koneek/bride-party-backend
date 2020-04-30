import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Payment, PaymentInput, PaymentStatus } from '../types'
import { PaymentService } from '../services'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'
import { ContestCondition } from '../models'

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

    @Mutation(() => String)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createPayment(
        @Ctx() { currentGuest, theMap }: Context,
        @Arg('input') { amount, conditionId }: PaymentInput,
    ): Promise<string> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        const payment = await this.service.create({
            amount,
            guestId: currentGuest.id,
            paymentableId: conditionId,
            paymentableType: ContestCondition.name,
        })

        const successUrl = `wedding/payments/${payment.id}/edit?status=${PaymentStatus.Finished}`
        const failUrl = `wedding/payments/${payment.id}/edit?status=${PaymentStatus.Failed}`

        const card = await currentGuest.card

        if (!card) {
            throw new Error('card not exist')
        }

        const url = await theMap.pay({
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
            orderId: payment.id,
            cardUid: 'cardInfo.cardUid',
            amount,
            failUrl,
            successUrl,
        })

        await this.service.updateStatus(payment, PaymentStatus.Run)

        return url
    }

    @Mutation(() => Payment)
    @UseMiddleware(CurrentGuestMiddleware)
    public async updatePaymentStatus(
        @Ctx() { currentGuest, theMap }: Context,
        @Arg('id') id: string,
        @Arg('status', () => PaymentStatus) status: PaymentStatus,
    ): Promise<Payment> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return await this.service.updateStatus(id, status)
    }
}
