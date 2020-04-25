import { Column, ForeignKey, Table } from 'sequelize-typescript'
import { BaseModel, Contest, UUIDColumn, Wedding } from './'

@Table
export class ContestWedding extends BaseModel<ContestWedding> {

    @ForeignKey(() => Contest)
    @Column(UUIDColumn)
    public contestId: string

    @ForeignKey(() => Wedding)
    @Column(UUIDColumn)
    public weddingId: string
}
