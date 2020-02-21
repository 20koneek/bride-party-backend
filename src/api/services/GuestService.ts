import { Service } from 'typedi'
import { Guest } from '../models'
import { GuestInput } from '../types/input'

@Service()
export class GuestService {
    public create = ({ name, firebaseUid }: GuestInput): Promise<Guest> => {
        const guest = new Guest()
        guest.name = name
        guest.firebaseUid = firebaseUid

        return guest.save()
    }
}
