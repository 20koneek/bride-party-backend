import { Service } from 'typedi'
// import {  Feed, UserInfo, Wedding } from '../models'

@Service()
export class FeedService {
    //
    // public find = async ({ uid, weddingId }: { uid: string, weddingId: string }): Promise<Feed | null> => {
    //     const wedding = await Wedding.findOne({
    //         where: { id: weddingId },
    //         include: [
    //             {
    //                 model: UserInfo,
    //                 through: {
    //                     where: { id: uid },
    //                 },
    //             },
    //         ],
    //     })
    //
    //     if (!wedding) {
    //         throw new Error('NotFound')
    //     }
    //
    //     return wedding
    // }
    //
    //
    // public create = ({ uid, weddingId }: { uid: string, weddingId: string }): Promise<Feed> => {
    //
    //     return (
    //         Feed.create({ weddingId })
    //     )
    // }
}
