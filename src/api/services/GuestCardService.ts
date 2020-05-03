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
}
