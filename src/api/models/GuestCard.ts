import { BelongsTo, Column, DataType, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel, Guest } from './'

@Table
export class GuestCard extends BaseModel<GuestCard> {

    @Column({ allowNull: false })
    public panMask: string

    @Column({ allowNull: false })
    public cardUid: string

    @Column({ allowNull: false })
    public month: number

    @Column({ allowNull: false })
    public year: number

    @Column({ allowNull: false })
    public status: string

    @Column({ allowNull: false })
    public cardHolder: string

    @ForeignKey(() => Guest)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public guestId: string

    @BelongsTo(() => Guest)
    public guest: Guest
}
