import { Column, Table } from 'sequelize-typescript'
import { BaseModel } from './'

@Table
export class UserInfo extends BaseModel<UserInfo> {

    @Column({ allowNull: false })
    public firstName: string

    @Column({ allowNull: false })
    public lastName: string

    @Column({ allowNull: false })
    public userId: string
}
