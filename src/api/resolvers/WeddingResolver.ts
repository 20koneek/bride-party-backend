import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding } from '../types'
import { CurrentGuestMiddleware } from './middlewares'
import { Context } from '../../types/Context'
import { Contest, ContestCondition } from '../models'

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

        const wedding = await currentGuest.$get(
            'wedding',
            {
                include: [{
                    model: Contest,
                    include: [ContestCondition],
                }],
            },
        )

        if (!wedding) {
            throw new Error('not found')
        }

        return wedding
    }
}
