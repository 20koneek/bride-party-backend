import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Guest, GuestInput } from '../types'
import { GuestService } from '../services'
import { Context } from '../../types/Context'

@Service()
@Resolver(() => Guest)
export class GuestResolver {

    constructor(
        private service: GuestService,
    ) {
    }

    @Mutation(() => Guest)
    public async createGuest(
        @Ctx() { token, theMap }: Context,
        @Arg('input') { name }: GuestInput,
    ): Promise<Guest> {
        if (!token) {
            throw new Error('not auth')
        }
        const guest = await this.service.create({ name, token })

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
