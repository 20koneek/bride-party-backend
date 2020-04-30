import { Service } from 'typedi'
import { Payment } from '../models'
import { PaymentStatus } from '../types/enums'

@Service()
export class PaymentService {

    public all = ({ guestId }: { guestId: string }): Promise<Payment[]> => (
        Payment.findAll({ where: { guestId } })
    )

    public find = ({ id }: { id: string }): Promise<Payment> => (
        Payment.findByPk(id)
    )

    public create = (params: {
        amount: number,
        guestId: string,
        paymentableId: string,
        paymentableType: string,
    }): Promise<Payment> => (
        Payment.create(params)
    )

    public updateStatus = async (data: Payment | string, status: PaymentStatus): Promise<Payment> => {
        const payment = typeof data === 'string' ? await Payment.findByPk(data) : data

        if (!payment) {
            throw new Error('notFound')
        }

        payment.status = status

        return payment.save()
    }
}
