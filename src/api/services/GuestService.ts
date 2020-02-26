import { Service } from 'typedi'
import { Guest } from '../models'

@Service()
export class GuestService {

    public find = (uid: string): Promise<Guest | undefined> => (
        Guest.findOne({ uid })
    )

    public create = ({ name, uid }: { name: string, uid: string }): Promise<Guest> => {
        const guest = new Guest()
        guest.name = name
        guest.uid = uid

        return guest.save()
    }
}
