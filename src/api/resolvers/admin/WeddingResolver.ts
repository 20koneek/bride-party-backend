import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Wedding, WeddingInput } from '../../types'
import { WeddingService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentUidMiddleware } from '../middlewares'

@Service()
@Resolver()
export class WeddingResolver {

    constructor(
        private service: WeddingService,
    ) {
    }

    @Query(() => Wedding)
    @UseMiddleware(CurrentUidMiddleware)
    public async wedding(
        @Arg('id') id: string,
        @Ctx() { uid }: ContextWithRequired,
    ): Promise<Wedding> {
        const wedding = await this.service.find({ id, uid })

        if (!wedding) {
            throw new Error('not found')
        }

        return wedding
    }

    @Mutation(() => Wedding)
    @UseMiddleware(CurrentUidMiddleware)
    public async weddingCreate(
        @Arg('input') input: WeddingInput,
        @Ctx() { uid }: ContextWithRequired,
    ): Promise<Wedding> {
        return this.service.create(input)
    }
}
