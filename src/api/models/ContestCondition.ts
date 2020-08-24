import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel, Color, Contest, UUIDColumn } from './'

@Table
export class ContestCondition extends BaseModel<ContestCondition> {

    @Column({ allowNull: false })
    public name: string

    @ForeignKey(() => Contest)
    @Column(UUIDColumn)
    public contestId: string

    @ForeignKey(() => Color)
    @Column(UUIDColumn)
    public colorId: string

    @BelongsTo(() => Contest)
    public contest: Contest

    @BelongsTo(() => Color)
    public color: Color
}
