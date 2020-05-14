import { Service } from 'typedi'
import { Guest, Post } from '../models'

@Service()
export class UserInfoService {

    public create = async ({ guest, message }: { guest: Guest, message: string }): Promise<Post> => (
        Post.create({
            message,
            guestId: guest.id,
            weddingId: guest.weddingId,
        })
    )
}
