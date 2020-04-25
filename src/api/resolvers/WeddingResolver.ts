import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding } from '../types'
import { CurrentGuestMiddleware } from './middlewares'
import { Context } from '../../types/Context'

@Service()
@Resolver(() => Wedding)
export class WeddingResolver {

    @Query(() => Wedding)
    @UseMiddleware(CurrentGuestMiddleware)
    public async currentWedding(
        @Ctx() { currentGuest }: Context,
    ): Promise<Wedding> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return currentGuest.wedding
    }
}
