import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'
import { GuestService, PaymentService } from '../services'
import { CardStatus, Guest, Status } from '../types'

@Service()
@Resolver(() => String)
export class CardResolver {

    constructor(
        private paymentService: PaymentService,
        private guestService: GuestService,
    ) {
    }

    @Mutation(() => String)
    @UseMiddleware(CurrentGuestMiddleware)
    public async addCard(
        @Ctx() { currentGuest, theMap }: Context,
    ): Promise<string> {
        if (!currentGuest) {
            throw new Error('Not auth')
        }

        const payment = await this.paymentService.create({
            amount: 100,
            guestId: currentGuest.id,
        })

        await this.guestService.update(currentGuest.id, { paymentId: payment.id })

        const successUrl = `guest/card/update/${payment.id}?status=${CardStatus.Confirmed}`
        const failUrl = `guest/card/update/${payment.id}?status=${CardStatus.Failed}`

        const result = theMap.addCard({
            successUrl,
            failUrl,
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
            orderId: payment.id,
            amount: payment.amount,
        })

        await this.paymentService.updateStatus(payment.id, Status.Run)

        return result
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public skipCard(
        @Ctx() { currentGuest }: Context,
    ): Promise<Guest> {
        if (!currentGuest) {
            throw new Error('Not auth')
        }

        return this.guestService.updateCardStatus({
            guest: currentGuest,
            cardStatus: CardStatus.Skipped,
        })
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public async updateCard(
        @Ctx() { currentGuest }: Context,
        @Arg('id') id: string,
        @Arg('status', () => CardStatus) cardStatus: CardStatus,
    ): Promise<Guest> {
        if (!currentGuest) {
            throw new Error('Not auth')
        }

        const status = cardStatus === CardStatus.Confirmed ? Status.Finished : Status.Failed
        await this.paymentService.updateStatus(currentGuest.paymentId, status)
        return await this.guestService.updateCardStatus({
            guest: currentGuest,
            cardStatus,
        })
    }
}

