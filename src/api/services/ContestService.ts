import { Service } from 'typedi'
import { Contest, ContestCondition, Color } from '../models'
import { ContestInput } from '../types'

@Service()
export class ContestService {

    public all = ({ uid }: { uid: string }): Promise<Contest[]> => (
        Contest.findAll({
            where: { uid },
            include: [{
                model: ContestCondition,
                include: [Color],
            }],
            order: [
                [{ model: ContestCondition, as: 'conditions' }, 'createdAt'],
            ],
        })
    )

    public find = ({ id, uid }: { id: string, uid: string }): Promise<Contest> => {
        const contest = Contest.findOne({
            where: { id, uid },
            include: [{
                model: ContestCondition,
                include: [Color],
            }],
            order: [
                [{ model: ContestCondition, as: 'conditions' }, 'createdAt'],
            ],
        })

        if (!contest) {
            throw new Error('NotFound')
        }

        return contest
    }

    public create = ({ uid, input }: { uid: string, input: ContestInput }): Promise<Contest> => (
        Contest.create({ uid, ...input })
    )

    public update = async ({ uid, input }: { uid: string, input: ContestInput }): Promise<Contest> => {
        const [, [contest]] = await Contest.update(input, { where: { uid } })

        return contest
    }
}
