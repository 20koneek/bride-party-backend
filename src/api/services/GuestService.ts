import { Service } from 'typedi'
import { Guest } from '../models'

@Service()
export class GuestService {

    public find = (uid: string): Promise<Guest | undefined> => (
        Guest.findOne({ uid })
    )

    public create = (
        { name, uid, weddingId }:
        { name: string, uid: string, weddingId: string },
    ): Promise<Guest> => {
        const guest = new Guest()
        guest.name = name
        guest.uid = uid
        guest.weddingId = weddingId

        return guest.save()
    }
}
