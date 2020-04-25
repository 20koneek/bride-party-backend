import {
    AllowNull,
    BelongsTo,
    Column,
    createIndexDecorator,
    DataType,
    Default,
    ForeignKey,
    Index,
    Table,
} from 'sequelize-typescript'
import { PaymentStatus } from '../types/enums'
import { BaseModel, Guest, UUIDColumn } from './'

const GroupIndex = createIndexDecorator({ type: 'FULLTEXT' })

@Table
export class Payment extends BaseModel<Payment> {

    @Column({ allowNull: false })
    public amount: number

    @Default(PaymentStatus.Init)
    @AllowNull(false)
    @Column(DataType.ENUM({ values: Object.keys(PaymentStatus) }))
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
