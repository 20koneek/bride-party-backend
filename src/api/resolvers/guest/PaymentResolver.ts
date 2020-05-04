import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Payment, PaymentInput, PaymentStatus } from '../../types'
import { PaymentService } from '../../services'
import { ContextWithGuest } from '../../../types/Context'
import { CurrentGuestMiddleware } from '../middlewares'
import { ContestCondition } from '../../models'

@Service()
@Resolver()
export class PaymentResolver {

    constructor(
        private service: PaymentService,
    ) {
    }

    @Query(() => [Payment])
    @UseMiddleware(CurrentGuestMiddleware)
    public async currentPayments(
        @Ctx() { currentGuest }: ContextWithGuest,
    ): Promise<Payment[]> {
        return await this.service.all({ guestId: currentGuest.id })
    }

    @Mutation(() => String)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createPayment(
        @Ctx() { currentGuest, theMap }: ContextWithGuest,
        @Arg('input') { amount, conditionId }: PaymentInput,
    ): Promise<string> {
        const payment = await this.service.create({
            amount,
            guestId: currentGuest.id,
            paymentableId: conditionId,
            paymentableType: ContestCondition.name,
        })

        const successUrl = `wedding/payments/${payment.id}/edit?status=${PaymentStatus.Finished}`
        const failUrl = `wedding/payments/${payment.id}/edit?status=${PaymentStatus.Failed}`

        const card = currentGuest.card

        if (!card) {
            throw new Error('card not exist')
        }

        const cardInfo = await card.$get('cardInfo')

        if (!cardInfo) {
            throw new Error('cardInfo not exist')
        }

        const url = await theMap.pay({
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
            orderId: payment.id,
            cardUid: cardInfo.cardUid,
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
        @Ctx() { currentGuest, theMap }: ContextWithGuest,
        @Arg('id') id: string,
        @Arg('status', () => PaymentStatus) status: PaymentStatus,
    ): Promise<Payment> {
        return await this.service.updateStatus(id, status)
    }
}
