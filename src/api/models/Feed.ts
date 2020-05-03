import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel, UUIDColumn, Wedding } from './'

@Table
export class Feed extends BaseModel<Feed> {

    @ForeignKey(() => Wedding)
    @Column(UUIDColumn)
    public weddingId: string

    @BelongsTo(() => Wedding)
    public wedding: Wedding
}
