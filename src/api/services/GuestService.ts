import { Service } from 'typedi'
import { Guest, GuestCard } from '../models'

@Service()
export class GuestService {

    public find = (uid: string): Promise<Guest | null> => (
        Guest.findOne({
            where: { uid, active: true },
            include: [GuestCard],
        })
    )

    public create = async (
        { name, uid, weddingId }:
        { name: string, uid: string, weddingId: string },
    ): Promise<Guest> => {
        await Guest.update({ active: false }, {
            where: { uid, weddingId },
        })

        let guest = await Guest.findOne({ where: { uid, weddingId } }) || new Guest()
        guest.name = name
        guest.uid = uid
        guest.weddingId = weddingId
        guest.active = true

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
