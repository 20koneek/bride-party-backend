import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Guest, GuestInput } from '../types'
import { GuestService } from '../services'
import { Context } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares/CurrentGuestMiddleware'

@Service()
@Resolver(() => Guest)
export class GuestResolver {

    constructor(
        private service: GuestService,
    ) {
    }

    @Mutation(() => Guest)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createGuest(
        @Ctx() { uid, theMap }: Context,
        @Arg('input') { name }: GuestInput,
    ): Promise<Guest> {
        if (!uid) {
            throw new Error('not auth')
        }
        const guest = await this.service.create({ name, uid })

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
