import { Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Contest } from '../types'
import { ContestService } from '../services'

@Service()
@Resolver(() => Contest)
export class ContestResolver {

    constructor(
        private service: ContestService,
    ) {
    }

    @Query(() => [Contest])
    public async currentContests(): Promise<Contest[]> {
        // if (!currentGuest) {
        //     throw new Error('not auth')
        // }
        return await this.service.all()
    }
}
