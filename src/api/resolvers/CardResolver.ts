import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'
import { GuestService, PaymentService } from '../services'
import { CardStatus, Guest } from '../types'

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
            contestConditionId: '32b3e30e-f519-41fc-b528-1961f570e78a',
        })

        const { SessionGUID } = await theMap.init({
            type: 'Add',
            orderId: payment.id,
            amount: payment.amount,
            addCard: true,
            recurrent: true,
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
        })

        await this.paymentService.run(payment.id)

        return theMap.createPayment({ SessionGUID })
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
}

