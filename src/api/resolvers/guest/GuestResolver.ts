import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Guest, GuestInput } from '../../types'
import { GuestService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentGuestMiddleware, CurrentUidMiddleware } from '../middlewares'

@Service()
@Resolver()
export class GuestResolver {

    constructor(
        private service: GuestService,
    ) {
    }

    @Query(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public currentGuest(
        @Ctx() { currentGuest }: ContextWithRequired,
    ): Guest {
        return currentGuest
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentUidMiddleware)
    public async createGuest(
        @Ctx() { uid, theMap }: ContextWithRequired,
        @Arg('input') { name, weddingId }: GuestInput,
    ): Promise<Guest> {
        const guest = await this.service.create({ name, uid, weddingId })

        const { Success, AlreadyCreated } = await theMap.createUser({
            login: guest.id,
            password: guest.getPassword(),
        })

        if (!Success || AlreadyCreated) {
            await guest.destroy()
            throw new Error('no created')
        }

        return guest
    }
}
