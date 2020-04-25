import { Service } from 'typedi'
import { Contest, ContestCondition, Wedding } from '../models'

@Service()
export class ContestService {

    public all = ({ weddingId }: { weddingId: string }): Promise<Contest[]> => (
        Contest.findAll({
            include: [
                ContestCondition,
                {
                    model: Wedding,
                    through: {
                        where: { id: weddingId },
                    },
                },
            ],
        })
    )

    public find = ({ id, weddingId }: { id: string, weddingId: string }): Promise<Contest> => (
        Contest.findOne({
            include: [
                ContestCondition,
                {
                    model: Wedding,
                    through: {
                        where: { id: weddingId },
                    },
                },
            ],
            where: { id },
        })
    )
}
