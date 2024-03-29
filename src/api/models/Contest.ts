import { Column, Table, HasMany, BelongsToMany, Index } from 'sequelize-typescript'
import { BaseModel, ContestCondition, ContestWedding, Wedding } from './'

@Table
export class Contest extends BaseModel<Contest> {

    @Index
    @Column({ allowNull: false })
    public uid: string

    @Column({ allowNull: false })
    public name: string

    @HasMany(() => ContestCondition)
    public conditions: ContestCondition[]

    @BelongsToMany(() => Wedding, () => ContestWedding)
    public weddings: Wedding[]
}
