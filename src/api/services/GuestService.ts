import { Service } from 'typedi'
import { Guest } from '../models'

@Service()
export class GuestService {

    public find = (token: string): Promise<Guest | undefined> => (
        Guest.findOne({ token })
    )

    public create = ({ name, token }: { name: string, token: string }): Promise<Guest> => {
        const guest = new Guest()
        guest.name = name
        guest.token = token

        return guest.save()
    }
}
