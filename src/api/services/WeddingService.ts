import { Service } from 'typedi'
import { Contest, Wedding } from '../models'

@Service()
export class WeddingService {

    public find = (id: string): Promise<Wedding | null> => (
        Wedding.findByPk(id, { include: [Contest] })
    )

    public create = (): Promise<Wedding> => (
        Wedding.create()
    )
}
