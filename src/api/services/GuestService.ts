import { Service } from 'typedi'
import { Guest, GuestCard } from '../models'

@Service()
export class GuestService {

    public find = (uid: string): Promise<Guest | null> => (
        Guest.findOne({
            where: { uid },
            include: [GuestCard],
        })
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

    public update = async (
        id: string,
        params: Partial<Omit<Guest, 'id'>>,
    ): Promise<Guest> => {
        const guest = await Guest.findByPk(id)

        if (!guest) {
            throw  new Error('not found')
        }

        Object.keys(params).forEach((key) => guest[key] = params[key])

        return guest.save()
    }
}
