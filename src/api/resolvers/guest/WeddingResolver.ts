import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding } from '../../types'
import { CurrentGuestMiddleware } from '../middlewares'
import { ContextWithRequired } from '../../../types/Context'
import { WeddingService } from '../../services'

@Service()
@Resolver()
export class WeddingResolver {

    constructor(
        private service: WeddingService,
    ) {
    }

    @Query(() => Wedding)
    @UseMiddleware(CurrentGuestMiddleware)
    public async currentWedding(
        @Ctx() { currentGuest }: ContextWithRequired,
    ): Promise<Wedding> {
        const wedding = await currentGuest.$get('wedding')

        if (!wedding) {
            throw new Error('not found')
        }

        return wedding
    }

    @Query(() => Wedding)
    public async wedding(
        @Arg('id') id: string,
    ): Promise<Wedding> {
        const wedding = await this.service.find(id)

        if (!wedding) {
            throw new Error('not found')
        }

        return wedding
    }
}
