import { Service } from 'typedi'
import { Contest } from '../models'

@Service()
export class ContestService {

    public all = ({ weddingId }: { weddingId: string }): Promise<Contest[]> => (
        Contest.find({
            relations: ['weddings'],
            where: `"Contest__weddings"."id" = '${weddingId}'`,
        })
    )
}
