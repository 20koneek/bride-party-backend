import { Resolver } from 'type-graphql'
import { Service } from 'typedi'
// import { Feed } from '../../types'
// import { FeedService } from '../../services'
// import { CurrentUidMiddleware } from '../middlewares'
// import { ContextWithRequired } from '../../../types/Context'

@Service()
@Resolver()
export class FeedResolver {

    constructor(
        // private service: FeedService,
    ) {
    }

    // @Query(() => Feed)
    // @UseMiddleware(CurrentUidMiddleware)
    // public async feed(
    //     @Arg('weddingId') weddingId: string,
    // ): Promise<Feed> {
    //     const wedding = await this.service.find(id)
    //
    //     if (!wedding) {
    //         throw new Error('not found')
    //     }
    //
    //     return wedding
    // }
    //
    // @Mutation(() => Feed)
    // @UseMiddleware(CurrentUidMiddleware)
    // public async feedCreate(
    //     @Arg('weddingId') weddingId: string,
    //     @Ctx() { uid }: ContextWithRequired,
    // ): Promise<Feed> {
    //     return this.service.create({ uid, weddingId })
    // }
}
