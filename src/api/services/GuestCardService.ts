import { Service } from 'typedi'
import { GuestCard } from '../models'
import { TheMapTypes } from '../../lib/theMap'

@Service()
export class GuestCardService {

    public create = ({
        guestId, cards,
    }: {
        guestId: string, cards: TheMapTypes.ListCard.Card[],
    }): Promise<GuestCard[]> => {
        const guestCards = cards.map(({ CardHolder, CardUId, EMonth, EYear, PanMask, Status }) => (
            new GuestCard({
                guestId: guestId,
                cardHolder: CardHolder,
                cardUid: CardUId,
                month: EMonth,
                year: EYear,
                panMask: PanMask,
                status: Status,
            })
        ))

        return GuestCard.bulkCreate(guestCards)
    }
}
