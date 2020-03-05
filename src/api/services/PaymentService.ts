import { Service } from 'typedi'
import { Payment } from '../models'
import { UpdateResult } from 'typeorm'

@Service()
export class PaymentService {

    public create = ({ amount, guestId }: { amount: number, guestId: string }): Promise<Payment> => {
        const payment = new Payment()
        payment.amount = amount
        payment.guestId = guestId

        return payment.save()
    }

    public run = (id: string): Promise<UpdateResult> => (
        Payment.update(id, { status: 'run' })
    )
}
