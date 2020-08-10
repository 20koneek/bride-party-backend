import { Column, Table } from 'sequelize-typescript'
import { BaseModel } from './'

@Table
export class Color extends BaseModel<Color> {

    @Column({ allowNull: false })
    public name: string

    @Column({ allowNull: false })
    public value: string
}
