import { Service } from 'typedi'
import { Color, Contest, ContestCondition, Wedding } from '../models'

@Service()
export class ContestGuestService {

    public all = ({ weddingId }: { weddingId: string }): Promise<Contest[]> => (
        Contest.findAll({
            include: [{
                model: Wedding,
                through: {
                    where: { id: weddingId },
                },
            }],
        })
    )

    public find = ({ id, weddingId }: { id: string, weddingId: string }): Promise<Contest> => (
        Contest.findOne({
            include: [
                {
                    model: ContestCondition,
                    include: [Color],
                },
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
