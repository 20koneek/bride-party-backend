import { Service } from 'typedi'
import { Wedding } from '../models'

@Service()
export class WeddingService {

    public find = (id: string): Promise<Wedding | undefined> => (
        Wedding.findOne({ id })
    )

    public create = (): Promise<Wedding> => {
        const wedding = new Wedding()

        return wedding.save()
    }
}
