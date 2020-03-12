import { Service } from 'typedi'
import { Contest } from '../models'

@Service()
export class ContestService {

    public find = ({ id }: { id: string }): Promise<Contest | undefined> => (
        Contest.findOne({ id })
    )

    public all = (): Promise<Contest[]> => (
        Contest.find()
    )
}
