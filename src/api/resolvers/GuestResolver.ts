import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Guest, GuestInput } from '../types'
import { GuestService } from '../services'

@Service()
@Resolver(() => Guest)
export class GuestResolver {

    constructor(
        private service: GuestService,
    ) {
    }

    @Mutation(() => Guest)
    public createGuest(
        @Arg('input') input: GuestInput,
    ): Promise<Guest> {
        return this.service.create(input)
    }
}
