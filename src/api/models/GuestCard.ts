import { BelongsTo, Column, Default, ForeignKey, HasOne, Table } from 'sequelize-typescript'
import { BaseModel, CardInfo, ENUMDataType, Guest, Payment, Paymentable, UUIDColumn } from './'
import { CardStatus } from '../types/enums'

@Table
export class GuestCard extends BaseModel<GuestCard> {

    @Default(CardStatus.Init)
    @Column(ENUMDataType(CardStatus))
    public status: CardStatus

    @ForeignKey(() => Guest)
    @Column(UUIDColumn)
    public guestId: string

    @ForeignKey(() => CardInfo)
    @Column({ ...UUIDColumn, allowNull: true })
    public cardInfoId?: string

    @BelongsTo(() => Guest)
    public guest: Guest

    @BelongsTo(() => CardInfo)
    public cardInfo: CardInfo

    @HasOne(() => Payment, Paymentable(GuestCard))
    public payment: Payment
}
