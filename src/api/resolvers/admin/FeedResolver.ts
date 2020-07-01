import { Service } from 'typedi'
import { Arg, Resolver, Subscription } from 'type-graphql'

@Service()
@Resolver()
export class FeedResolver {

    constructor() {
    }

    @Subscription({
        topics: 'NOTIFICATIONS',
    })
    public feeds(
        @Arg('test') test: string,
    ): string {
        console.log(test)
        return 'test'
    }
}
