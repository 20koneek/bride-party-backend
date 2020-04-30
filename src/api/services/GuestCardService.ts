import { Service } from 'typedi'
import { Guest, GuestCard, Payment } from '../models'

@Service()
export class GuestCardService {

    public create = async (guest: Guest): Promise<Payment> => {
        const card = await GuestCard.create({ guestId: guest.id })

        return Payment.create({
            amount: 100,
            guestId: guest.id,
            paymentableId: card.id,
            paymentableType: GuestCard.name,
        })
    }

    public update = async (
        id: string,
        // params: Partial<Omit<Guest, 'id'>>,
    ): Promise<Guest> => {
        const guest = await Guest.findByPk(id)

        if (!guest) {
            throw  new Error('not found')
        }

        // Object.keys(params).forEach((key) => guest[key] = params[key])

        return guest.save()
    }
}
