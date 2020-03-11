import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Guest, GuestInput } from '../types'
import { GuestService } from '../services'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'

@Service()
@Resolver(() => Guest)
export class GuestResolver {

    constructor(
        private service: GuestService,
    ) {
    }

    @Query(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public currentGuest(
        @Ctx() { currentGuest }: Context,
    ): Guest {
        if (!currentGuest) {
            throw new Error('not auth')
        }

        return currentGuest
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createGuest(
        @Ctx() { uid, theMap }: Context,
        @Arg('input') { name, weddingId }: GuestInput,
    ): Promise<Guest> {
        if (!uid) {
            throw new Error('not auth')
        }
        const guest = await this.service.create({ name, uid, weddingId })

        const { Success, AlreadyCreated } = await theMap.createUser({
            login: guest.id,
            password: guest.getPassword(),
        })

        if (!Success || AlreadyCreated) {
            await guest.remove()
            throw new Error('no created')
        }

        return guest
    }
}
