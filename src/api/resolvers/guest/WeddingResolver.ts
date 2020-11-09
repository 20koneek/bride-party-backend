import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding, WeddingInfo } from '../../types'
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

    @Query(() => WeddingInfo)
    public async weddingInfo(
        @Arg('id') id: string,
    ): Promise<WeddingInfo> {
        const wedding = await this.service.findById(id)

        if (!wedding) {
            throw new Error('not found')
        }

        return wedding
    }
}
