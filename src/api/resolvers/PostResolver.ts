import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { Payment, Post, PostInput } from '../types'
import { PostService } from '../services'
import { ContextWithGuest } from '../../types/Context'
import { CurrentGuestMiddleware } from './middlewares'

@Service()
@Resolver(() => Payment)
export class PaymentResolver {

    constructor(
        private service: PostService,
    ) {
    }

    @Mutation(() => Post)
    @UseMiddleware(CurrentGuestMiddleware)
    public async createPost(
        @Ctx() { currentGuest, theMap }: ContextWithGuest,
        @Arg('input') { messages }: PostInput,
    ): Promise<Post> {
        return this.service.create({
            messages,
            guest: currentGuest,
        })
    }
}
