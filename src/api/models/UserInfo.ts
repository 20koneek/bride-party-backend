import { AllowNull, Column, Default, Index, Table } from 'sequelize-typescript'
import { BaseModel, ENUMDataType } from './'
import { Role } from '../types/enums'

@Table
export class UserInfo extends BaseModel<UserInfo> {

    @Column({ allowNull: false })
    public firstName: string

    @Column({ allowNull: false })
    public lastName: string

    @Index({ unique: true })
    @Column({ allowNull: false })
    public uid: string

    @Default(Role.User)
    @AllowNull(false)
    @Column(ENUMDataType(Role))
    public role: Role

    public isAdmin = () => this.role === Role.Admin
}
