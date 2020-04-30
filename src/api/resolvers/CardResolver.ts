import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'
import { CardStatus, PaymentStatus } from '../types/enums'
import { CardInfoService, GuestCardService, PaymentService } from '../services'
import { Guest } from '../types'

@Service()
@Resolver(() => String)
export class CardResolver {

    constructor(
        private paymentService: PaymentService,
        private cardService: GuestCardService,
        private cardInfoService: CardInfoService,
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

        const payment = await this.cardService.create(currentGuest)

        const successUrl = `guest/card/update/${payment.id}?status=${CardStatus.Confirmed}`
        const failUrl = `guest/card/update/${payment.id}?status=${CardStatus.Failed}`

        const result = theMap.addCard({
            successUrl,
            failUrl,
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
            orderId: payment.id,
            amount: payment.amount,
            cardUid: '',
        })

        await this.paymentService.updateStatus(payment.id, PaymentStatus.Run)

        return result
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public async skipCard(
        @Ctx() { currentGuest }: Context,
    ): Promise<Guest> {
        if (!currentGuest) {
            throw new Error('Not auth')
        }

        const card = currentGuest.card

        if (card) {
            card.status = CardStatus.Skipped

            await card.save()
        }

        return currentGuest.reload()
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public async updateCard(
        @Ctx() { currentGuest, theMap }: Context,
        @Arg('id') id: string,
        @Arg('status', () => CardStatus) cardStatus: CardStatus,
    ): Promise<Guest> {
        if (!currentGuest) {
            throw new Error('Not auth')
        }

        const status = cardStatus === CardStatus.Confirmed ? PaymentStatus.Finished : PaymentStatus.Failed
        const response = await theMap.listCard({ login: currentGuest.id, password: currentGuest.getPassword() })
        const card = currentGuest.card

        if (card) {
            const payment = await card.$get('payment')

            if (payment) {
                if (response.Success) {
                    const cardInfo = await this.cardInfoService.create(response.Cards[0])
                    await this.paymentService.updateStatus(payment, status)
                    card.cardInfoId = cardInfo.id
                    card.status = cardStatus
                    await card.save()
                }
            }
        }

        return currentGuest.reload()
    }
}

