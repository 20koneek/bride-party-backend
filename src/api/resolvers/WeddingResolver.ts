import { Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding } from '../types'
import { WeddingService } from '../services'
import { CurrentGuestMiddleware } from './middlewares'
import { Context } from '../../types/Context'

@Service()
@Resolver(() => Wedding)
export class WeddingResolver {

    constructor(
        private service: WeddingService,
    ) {
    }

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

    @Mutation(() => Wedding)
    // @UseMiddleware(CurrentGuestMiddleware)
    public async createWedding(): Promise<Wedding> {
        return await this.service.create()
    }
}
