import { AllowNull, Column, Default, HasMany, Index, Table } from 'sequelize-typescript'
import { BaseModel, ContestCondition, ENUMDataType } from './'
import { ColorStatus } from '../types/enums'

@Table
export class Color extends BaseModel<Color> {

    @Index
    @Column({ allowNull: false })
    public name: string

    @Column({ allowNull: false })
    public value: string

    @Index
    @AllowNull(false)
    @Default(ColorStatus.Active)
    @Column(ENUMDataType(ColorStatus))
    public status: ColorStatus

    @HasMany(() => ContestCondition)
    public conditions: ContestCondition[]
}
