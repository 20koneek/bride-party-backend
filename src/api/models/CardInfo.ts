import { Column, Table } from 'sequelize-typescript'
import { BaseModel } from './'

@Table
export class CardInfo extends BaseModel<CardInfo> {

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
}
