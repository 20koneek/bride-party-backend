import { Service } from 'typedi'
import { Contest, ContestCondition } from '../models'
import { ContestInput } from '../types/input'

@Service()
export class ContestService {

    public all = ({ uid }: { uid: string }): Promise<Contest[]> => (
        Contest.findAll({
            where: { uid },
            include: [ContestCondition],
        })
    )

    public find = ({ id, uid }: { id: string, uid: string }): Promise<Contest> => (
        Contest.findOne({
            where: { id, uid },
            include: [ContestCondition],
        })
    )

    public create = ({ uid, input }: { uid: string, input: ContestInput }): Promise<Contest> => (
        Contest.create({ uid, ...input })
    )

    public update = async ({ uid, input }: { uid: string, input: ContestInput }): Promise<Contest> => {
        const [, [contest]] = await Contest.update(input, { where: { uid } })

        return contest
    }
}
