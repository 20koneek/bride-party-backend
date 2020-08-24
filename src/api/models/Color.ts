import { Column, HasMany, Index, Table } from 'sequelize-typescript'
import { BaseModel, ContestCondition } from './'

@Table
export class Color extends BaseModel<Color> {

    @Index
    @Column({ allowNull: false })
    public name: string

    @Column({ allowNull: false })
    public value: string

    @HasMany(() => ContestCondition)
    public conditions: ContestCondition[]
}
