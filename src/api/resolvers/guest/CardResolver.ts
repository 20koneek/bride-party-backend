import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentGuestMiddleware } from '../middlewares'
import { CardStatus, PaymentStatus } from '../../types/enums'
import { CardInfoService, GuestCardService, PaymentService } from '../../services'
import { Guest } from '../../types'
import { GuestCard } from '../../models'

@Service()
@Resolver()
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
        @Ctx() { currentGuest, theMap }: ContextWithRequired,
    ): Promise<string> {
        const payment = await this.cardService.create(currentGuest)

        const successUrl = `payments/${payment.id}/update?status=${PaymentStatus.Finished}`
        const failUrl = `payments/${payment.id}/update?status=${PaymentStatus.Failed}`

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
        @Ctx() { currentGuest }: ContextWithRequired,
    ): Promise<Guest> {
        const card = currentGuest.card || new GuestCard()
        card.guestId = currentGuest.id
        card.status = CardStatus.Skipped

        currentGuest.card = await card.save()

        return currentGuest
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public async updatePaymentStatus(
        @Ctx() { currentGuest, theMap }: ContextWithRequired,
        @Arg('id') id: string,
        @Arg('status', () => PaymentStatus) paymentStatus: PaymentStatus,
    ): Promise<Guest> {
        const payment = await this.paymentService.updateStatus(id, paymentStatus)

        if (payment.paymentableType === GuestCard.name) {
            const card = currentGuest.card

            if (card?.id === payment.paymentableId) {
                const response = await theMap.listCard({ login: currentGuest.id, password: currentGuest.getPassword() })

                // @ts-ignore
                if (response.Success) {
                    // @ts-ignore
                    const cardInfo = await this.cardInfoService.create(response.Cards[0])
                    card.cardInfoId = cardInfo.id
                    card.status = CardStatus.Confirmed
                } else {
                    card.status = CardStatus.Failed
                }

                await card.save()
            }
        }

        return currentGuest.reload()
    }
}

