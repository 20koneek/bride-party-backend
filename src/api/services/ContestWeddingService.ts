import { Service } from 'typedi'
import { ContestWedding } from '../models'
import { ContestService, WeddingService } from '.'

@Service()
export class ContestWeddingService {

    constructor(
        private weddingService: WeddingService,
        private contestService: ContestService,
    ) {
    }

    public create = async ({ uid, weddingId, contestId }: { uid: string, weddingId: string, contestId: string }): Promise<boolean> => {
        await this.contestService.find({ uid, id: contestId })
        await this.weddingService.find({ uid, id: weddingId })

        const condition = await ContestWedding.create({ contestId, weddingId })

        return !!condition
    }

    public delete = async ({ uid, weddingId, contestId }: { uid: string, weddingId: string, contestId: string }): Promise<boolean> => {
        await this.contestService.find({ uid, id: contestId })
        await this.weddingService.find({ uid, id: weddingId })

        const condition = await ContestWedding.destroy({
            where: {
                contestId,
                weddingId,
            },
        })

        return !!condition
    }

}
