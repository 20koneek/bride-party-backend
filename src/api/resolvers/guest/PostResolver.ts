import { Arg, Ctx, Mutation, Publisher, PubSub, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Post, PostInput } from '../../types'
import { PostService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentGuestMiddleware } from '../middlewares'
import { EVENTS } from '../../subscriptions'

@Service()
@Resolver()
export class PaymentResolver {

    constructor(
        private service: PostService,
    ) {
    }

    @Mutation(() => Post)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createPost(
        @Ctx() { currentGuest, theMap }: ContextWithRequired,
        @PubSub(EVENTS.POSTS.CREATED) publish: Publisher<Post>,
        @Arg('input') { message }: PostInput,
    ): Promise<Post> {
        const post = await this.service.create({
            message,
            guest: currentGuest,
        })

        await publish(post)

        return post
    }
}
