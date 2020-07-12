import { Op } from 'sequelize'
import { Service } from 'typedi'
import { Wedding } from '../models'
import { WeddingInput } from '../types/input'

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
