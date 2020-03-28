import { Service } from 'typedi'
import { BaseModel, Guest } from '../models'
import { CardStatus } from '../types/enums'
import { UpdateResult } from 'typeorm'

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

    public updateCardStatus = (
        { guest, cardStatus }:
        { guest: Guest, cardStatus: CardStatus },
    ): Promise<Guest> => {
        guest.cardStatus = cardStatus
        return guest.save()
    }

    public update = (
        id: string,
        params: Partial<Omit<Guest, keyof BaseModel>>,
    ): Promise<UpdateResult> => (
        Guest.update(id, params)
    )
}
