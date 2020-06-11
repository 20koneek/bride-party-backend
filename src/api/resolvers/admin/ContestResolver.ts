import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Contest, ContestInput } from '../../types'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentUidMiddleware } from '../middlewares'
import { ContestService } from '../../services'

@Service()
@Resolver()
export class ContestResolver {

    constructor(
        private service: ContestService,
    ) {
    }

    @Query(() => [Contest])
    @UseMiddleware(CurrentUidMiddleware)
    public contests(
        @Ctx() { uid }: ContextWithRequired,
    ): Promise<Contest[]> {
        return this.service.all({ uid })
    }

    @Query(() => Contest)
    @UseMiddleware(CurrentUidMiddleware)
    public contest(
        @Ctx() { currentGuest }: ContextWithRequired,
        @Arg('id') id: string,
    ): Promise<Contest> {
        return this.service.find({ id, weddingId: currentGuest.weddingId })
    }

    @Mutation(() => Contest)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestCreate(
        @Arg('input') input: ContestInput,
        @Ctx() { uid }: ContextWithRequired,
    ): Promise<Contest> {
        return this.service.create(input)
    }

    @Mutation(() => Contest)
    @UseMiddleware(CurrentUidMiddleware)
    public async contestUpdate(
        @Arg('input') input: ContestInput,
        @Ctx() { uid }: ContextWithRequired,
    ): Promise<Contest> {
        return this.service.update({ uid, input })
    }
}
