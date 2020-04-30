import { Service } from 'typedi'
import { CardInfo } from '../models'
import { TheMapTypes } from '../../lib/theMap'

@Service()
export class CardInfoService {

    public create = async ({
        CardHolder,
        CardUId,
        EMonth,
        EYear,
        PanMask,
        Status,
    }: TheMapTypes.ListCard.Card): Promise<CardInfo> => (
        CardInfo.create({
            cardHolder: CardHolder,
            cardUid: CardUId,
            month: EMonth,
            year: EYear,
            panMask: PanMask,
            status: Status,
        })
    )
}
