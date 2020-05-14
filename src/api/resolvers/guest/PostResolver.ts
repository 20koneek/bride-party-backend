import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Post, PostInput } from '../../types'
import { PostService } from '../../services'
import { ContextWithRequired } from '../../../types/Context'
import { CurrentGuestMiddleware } from '../middlewares'

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
        @Arg('input') { message }: PostInput,
    ): Promise<Post> {
        return this.service.create({
            message,
            guest: currentGuest,
        })
    }
}
