import { Service } from 'typedi'
import { Contest, ContestCondition, Wedding } from '../models'
import { ContestInput } from '../types/input'

@Service()
export class ContestService {

    public all = ({ uid }: { uid: string }): Promise<Contest[]> => (
        Contest.findAll({
            where: { uid },
            include: [
                ContestCondition,
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

    public create = (input: ContestInput): Promise<Contest> => (
        Contest.findByPk('1')
    )

    public update = ({ uid, input }: { uid: string, input: ContestInput }): Promise<Contest> => (
        Contest.findByPk('1')
    )
}
