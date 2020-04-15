import { Service } from 'typedi'
import { Payment } from '../models'
import { PaymentStatus } from '../types/enums'

@Service()
export class PaymentService {

    public all = ({ guestId }: { guestId: string }): Promise<Payment[]> => (
        Payment.find({ guestId })
    )

    public find = ({ id }: { id: string }): Promise<Payment> => (
        Payment.findOneOrFail(id)
    )

    public create = ({
        amount,
        guestId,
        conditionId,
    }: {
        amount: number,
        guestId: string,
        conditionId?: string,
    }): Promise<Payment> => {
        const payment = new Payment()
        payment.amount = amount
        payment.guestId = guestId
        conditionId && (payment.contestConditionId = conditionId)

        return payment.save()
    }

    public updateStatus = async (id: string, status: PaymentStatus): Promise<Payment> => {
        const payment = await Payment.findOneOrFail(id)
        payment.status = status

        return await payment.save()
    }
}
