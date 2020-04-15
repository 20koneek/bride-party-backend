import { Service } from 'typedi'
import { GuestCard } from '../models'
import { TheMapTypes } from '../../lib/theMap'

@Service()
export class GuestCardService {

    public create = async ({
        guestId, cards,
    }: {
        guestId: string, cards: TheMapTypes.ListCard.Card[],
    }): Promise<GuestCard[]> => {
        const guestCards = cards.map(({ CardHolder, CardUId, EMonth, EYear, PanMask, Status }) => {
            const card = new GuestCard()
            card.guestId = guestId
            card.cardHolder = CardHolder
            card.cardUid = CardUId
            card.month = EMonth
            card.year = EYear
            card.panMask = PanMask
            card.status = Status

            return card
        })

        return await GuestCard.save(guestCards)
    }
}
