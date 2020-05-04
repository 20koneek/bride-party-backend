import { Arg, Ctx, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Contest } from '../../types'
import { ContestService } from '../../services'
import { ContextWithGuest } from '../../../types/Context'
import { CurrentGuestMiddleware } from '../middlewares'

@Service()
@Resolver()
export class ContestResolver {

    constructor(
        private service: ContestService,
    ) {
    }

    @Query(() => [Contest])
    @UseMiddleware(CurrentGuestMiddleware)
    public currentContests(
        @Ctx() { currentGuest }: ContextWithGuest,
    ): Promise<Contest[]> {
        return this.service.all({ weddingId: currentGuest.weddingId })
    }

    @Query(() => Contest)
    @UseMiddleware(CurrentGuestMiddleware)
    public currentContest(
        @Ctx() { currentGuest }: ContextWithGuest,
        @Arg('id') id: string,
    ): Promise<Contest> {
        return this.service.find({ id, weddingId: currentGuest.weddingId })
    }
}
