import { Service } from 'typedi'
import { Arg, Resolver, Subscription, Root, UseMiddleware, Ctx } from 'type-graphql'
import { CurrentUidMiddleware } from '../middlewares'
import { Post as PostModel } from '../../models'
import { WeddingService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { Post } from '../../types'
import { EVENTS } from '../../subscriptions'

@Service()
@Resolver()
export class FeedResolver {

    constructor(
        private weddingService: WeddingService,
    ) {
    }

    @Subscription(() => Post, {
        topics: EVENTS.POSTS.CREATED,
        filter: ({ payload, args }) => {
            const { weddingId }: { weddingId: string } = args
            const post: PostModel = payload

            return post.weddingId === weddingId
        },
    })
    @UseMiddleware(CurrentUidMiddleware)
    public async feeds(
        @Ctx() { uid }: ContextWithRequired,
        @Root() post: PostModel,
        @Arg('weddingId') weddingId: string,
    ): Promise<PostModel> {
        await this.weddingService.find({ id: weddingId, uid })

        return post
    }
}
