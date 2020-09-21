import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { ContestWeddingService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentUidMiddleware } from '../middlewares'

@Service()
@Resolver()
export class ContestWeddingResolver {

    constructor(
        private service: ContestWeddingService,
    ) {
    }

    @Mutation(() => Boolean)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestWeddingCreate(
        @Ctx() { uid }: ContextWithRequired,
        @Arg('weddingId') weddingId: string,
        @Arg('contestId') contestId: string,
    ): Promise<Boolean> {
        return this.service.create({ uid, weddingId, contestId })
    }

    @Mutation(() => Boolean)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestWeddingDelete(
        @Ctx() { uid }: ContextWithRequired,
        @Arg('weddingId') weddingId: string,
        @Arg('contestId') contestId: string,
    ): Promise<Boolean> {
        return this.service.delete({ uid, weddingId, contestId })
    }
}
