import { Op } from 'sequelize'
import { Service } from 'typedi'
import { Color, Contest, ContestCondition, Wedding } from '../models'
import { WeddingInput } from '../types'

@Service()
export class WeddingService {

    public findById = (id: string): Promise<Wedding | null> => (
        Wedding.findOne({
            where: { id },
        })
    )

    public find = async ({ id, uid }: { id: string, uid: string }): Promise<Wedding> => {
        const wedding = await Wedding.findOne({
            where: { id, uid },
            include: [
                {
                    model: Contest,
                    include: [
                        {
                            model: ContestCondition,
                            include: [Color],
                        },
                    ],
                },
            ],
        })

        if (!wedding) {
            throw new Error('NotFound')
        }

        return wedding
    }

    public findBetweenDate = async ({ uid, startDate, endDate }: { uid: string, startDate: Date, endDate: Date }): Promise<Wedding[]> => (
        Wedding.findAll({
            where: {
                uid,
                startDate: { [Op.gte]: startDate },
                endDate: { [Op.lte]: endDate },
            },
        })
    )

    public create = ({ input, uid }: { input: WeddingInput, uid: string }): Promise<Wedding> => (
        Wedding.create({ ...input, uid })
    )
}
