import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Contest } from '../../types'
import { ContestGuestService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentGuestMiddleware } from '../middlewares'

@Service()
@Resolver()
export class ContestResolver {

    constructor(
        private service: ContestGuestService,
    ) {
    }

    @Query(() => [Contest])
    @UseMiddleware(CurrentGuestMiddleware)
    public currentContests(
        @Ctx() { currentGuest }: ContextWithRequired,
    ): Promise<Contest[]> {
        return this.service.all({ weddingId: currentGuest.weddingId })
    }

    @Query(() => Contest)
    @UseMiddleware(CurrentGuestMiddleware)
    public currentContest(
        @Ctx() { currentGuest }: ContextWithRequired,
        @Arg('id') id: string,
    ): Promise<Contest> {
        return this.service.find({ id, weddingId: currentGuest.weddingId })
    }
}
