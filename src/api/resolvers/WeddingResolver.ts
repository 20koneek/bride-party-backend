import { Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding } from '../types'
import { WeddingService } from '../services'

@Service()
@Resolver(() => Wedding)
export class WeddingResolver {

    constructor(
        private service: WeddingService,
    ) {
    }

    @Mutation(() => Wedding)
    // @UseMiddleware(CurrentGuestMiddleware)
    public async createWedding(): Promise<Wedding> {
        return await this.service.create()
    }
}
