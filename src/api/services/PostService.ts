import { Service } from 'typedi'
import { Guest, Post } from '../models'

@Service()
export class PostService {

    public create = async ({ guest, messages }: { guest: Guest, messages: string }): Promise<Post> => (
        Post.create({
            messages,
            guestId: guest.id,
            weddingId: guest.weddingId,
        })
    )
}
