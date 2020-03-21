import { Service } from 'typedi'
import { Payment } from '../models'
import { UpdateResult } from 'typeorm'
import { Status } from '../types/enums'

@Service()
export class PaymentService {

    public all = ({ guestId }: { guestId: string }): Promise<Payment[]> => {
        return Payment.find({ guestId })
    }

    public create = ({
        amount, guestId, contestConditionId,
    }: {
        amount: number, guestId: string, contestConditionId: string
    }): Promise<Payment> => {
        const payment = new Payment()
        payment.amount = amount
        payment.guestId = guestId
        payment.contestConditionId = contestConditionId

        return payment.save()
    }

    public run = (id: string): Promise<UpdateResult> => (
        Payment.update(id, { status: Status.Run })
    )
}
