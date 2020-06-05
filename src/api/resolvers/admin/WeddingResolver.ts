import { Arg, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding } from '../../types'
import { WeddingService } from '../../services'

@Service()
@Resolver()
export class WeddingResolver {

    constructor(
        private service: WeddingService,
    ) {
    }

    @Query(() => Wedding)
    public async createWedding(
        @Arg('id') id: string,
    ): Promise<Wedding> {
        const wedding = await this.service.find(id)

        if (!wedding) {
            throw new Error('not found')
        }

        return wedding
    }
}
