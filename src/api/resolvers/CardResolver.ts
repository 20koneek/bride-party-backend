import { Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Guest } from '../types'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'

@Service()
@Resolver(() => Guest)
export class CardResolver {

    @Mutation(() => String)
    @UseMiddleware(CurrentGuestMiddleware)
    public async addCard(
        @Ctx() { currentGuest, theMap }: Context,
    ): Promise<string> {
        if (!currentGuest) {
            throw new Error('Not auth')
        }

        const { SessionGUID } = await theMap.init({
            type: 'Add',
            orderId: '123',
            amount: 100,
            addCard: true,
            recurrent: true,
            userLogin: currentGuest.id,
            userPassword: currentGuest.getPassword(),
        })

        return theMap.createPayment({ SessionGUID })
    }
}

