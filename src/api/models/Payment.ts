import {
    AllowNull,
    BelongsTo,
    Column,
    Default,
    ForeignKey,
    Index,
    Table,
} from 'sequelize-typescript'
import { PaymentStatus } from '../types/enums'
import { BaseModel, ENUMDataType, GroupIndex, Guest, UUIDColumn } from './'

@Table
export class Payment extends BaseModel<Payment> {

    @Column({ allowNull: false })
    public amount: number

    @Default(PaymentStatus.Init)
    @AllowNull(false)
    @Column(ENUMDataType(PaymentStatus))
    public status: PaymentStatus

    @ForeignKey(() => Guest)
    @Column(UUIDColumn)
    public guestId: string

    @BelongsTo(() => Guest)
    public guest: Guest

    @Index
    @GroupIndex
    @Column({ ...UUIDColumn, field: 'paymentableId' })
    public paymentableId: string

    @Index
    @GroupIndex
    @Column({ allowNull: false, field: 'paymentableType' })
    public paymentableType: string
}
