import { Service } from 'typedi'
import { Guest } from '../models'
import { CardStatus } from '../types/enums'

@Service()
export class GuestService {

    public find = (uid: string): Promise<Guest | null> => (
        Guest.findByPk(uid, {
            // include: [{
            //     model: Payment,
            // }],
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

    public updateCardStatus = (
        { guest, cardStatus }:
            { guest: Guest, cardStatus: CardStatus },
    ): Promise<Guest> => {
        guest.cardStatus = cardStatus
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
