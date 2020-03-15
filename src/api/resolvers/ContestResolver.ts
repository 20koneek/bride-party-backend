import { Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Contest } from '../types'
import { ContestService } from '../services'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'

@Service()
@Resolver(() => Contest)
export class ContestResolver {

    constructor(
        private service: ContestService,
    ) {
    }

    @Query(() => [Contest])
    @UseMiddleware(CurrentGuestMiddleware)
    public async currentContests(
        @Ctx() { currentGuest }: Context,
    ): Promise<Contest[]> {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return await this.service.all({ weddingId: currentGuest.weddingId })
    }
}
