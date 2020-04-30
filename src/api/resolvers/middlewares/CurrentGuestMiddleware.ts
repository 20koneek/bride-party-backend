import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../../types/Context'
import { GuestService } from '../../services'

export class CurrentGuestMiddleware implements MiddlewareInterface<Context> {

    constructor(
        @Service() private service: GuestService,
    ) {
    }

    public use = async ({ context }: ResolverData<Context>, next: NextFn) => {
        if (!context.token) {
            throw new Error('Not auth')
        }

        const { uid } = await context.firebase.auth().verifyIdToken(context.token)
        context.uid = uid
        context.currentGuest = await this.service.find(uid)

        const guest = await this.service.find(uid)

        if (guest) {
            const card = guest.card

            if (card) {
                console.log('====================================')
                console.log(await card.$get('payment'))
            }
        }

        return next()
    }
}
