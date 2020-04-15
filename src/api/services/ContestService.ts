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

    public find = ({ id, weddingId }: { id: string, weddingId: string }): Promise<Contest> => (
        Contest.findOneOrFail({
            relations: ['weddings'],
            where: `"Contest"."id" = '${id}' and "Contest__weddings"."id" = '${weddingId}'`,
        })
    )
}
