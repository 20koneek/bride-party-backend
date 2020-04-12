import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { CardStatus, Payment, PaymentInput, Status } from '../types'
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
        @Ctx() { currentGuest, theMap }: Context,
        @Arg('input') { amount, conditionId }: PaymentInput,
    ): Promise<Payment> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        const payment = await this.service.create({
            amount,
            conditionId,
            guestId: currentGuest.id,
        })

        const successUrl = `guest/card/update/${payment.id}?status=${CardStatus.Confirmed}`
        const failUrl = `guest/card/update/${payment.id}?status=${CardStatus.Failed}`

        await theMap.pay({
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
            orderId: payment.id,
            amount,
            failUrl,
            successUrl,
        })

        await this.service.updateStatus(payment.id, Status.Run)

        return payment
    }

    @Mutation(() => Payment)
    @UseMiddleware(CurrentGuestMiddleware)
    public async updatePaymentStatus(
        @Ctx() { currentGuest, theMap }: Context,
        @Arg('id') id: string,
        @Arg('status', () => Status) status: Status,
    ): Promise<Payment> {
        if (!currentGuest) {
            throw new Error('not auth')
        }
        const payment = await this.service.find({ id })

        if (!payment.contestConditionId) {
            const response = await theMap.listCard({ login: currentGuest.id, password: currentGuest.getPassword() })
            console.log(response)
        }

        return await this.service.updateStatus(id, status)
    }
}
