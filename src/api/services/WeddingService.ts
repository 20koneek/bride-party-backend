import { Service } from 'typedi'
import { UserInfo, Wedding } from '../models'
import { WeddingInput } from '../types/input'

@Service()
export class WeddingService {

    public find = async ({ id, uid }: { id: string, uid: string }): Promise<Wedding | null> => {
        const wedding = await Wedding.findOne({
            where: { id },
            include: [
                {
                    model: UserInfo,
                    through: {
                        where: { id: uid },
                    },
                },
            ],
        })

        if (!wedding) {
            throw new Error('NotFound')
        }

        return wedding
    }

    public create = (input: WeddingInput): Promise<Wedding> => (
        Wedding.create(input)
    )
}
