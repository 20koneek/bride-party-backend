import { Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

@Service()
@Resolver()
export class TestResolver {

    constructor() {
    }

    @Query(() => String)
    public test(): string {
        return 'Test'
    }
}
