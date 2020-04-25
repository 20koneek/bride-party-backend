import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel, Contest, UUIDColumn } from './'

@Table
export class ContestCondition extends BaseModel<ContestCondition> {

    @Column({ allowNull: false })
    public name: string

    @ForeignKey(() => Contest)
    @Column(UUIDColumn)
    public contestId: string

    @BelongsTo(() => Contest)
    public contest: Contest
}
