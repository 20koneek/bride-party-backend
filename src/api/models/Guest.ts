import { v4 } from 'uuid'
import { SHA1 } from 'crypto-js'
import {
    BelongsTo,
    Column,
    ForeignKey,
    HasMany,
    HasOne,
    Index,
    Table,
} from 'sequelize-typescript'
import {
    BaseModel,
    GroupUniqueIndex,
    GuestCard,
    Payment,
    Post,
    UUIDColumn,
    Wedding,
} from './'

@Table
export class Guest extends BaseModel<Guest> {

    constructor(...args) {
        super(...args)

        if (!this.salt) {
            this.salt = SHA1(v4()).toString()
        }
    }

    @Column({ allowNull: false })
    public name: string

    @Index
    @GroupUniqueIndex
    @Column({ allowNull: false })
    public uid: string

    @Index
    @Column({ allowNull: false })
    public active: boolean

    @Column({ allowNull: false })
    public salt: string

    @GroupUniqueIndex
    @ForeignKey(() => Wedding)
    @Column({ ...UUIDColumn, field: 'weddingId' })
    public weddingId: string

    @BelongsTo(() => Wedding)
    public wedding: Wedding

    @HasOne(() => GuestCard)
    public card: GuestCard

    @HasMany(() => Payment)
    public payments: Payment[]

    @HasMany(() => Post)
    public posts: Post[]

    public getPassword = (): string => (
        SHA1(this.salt + this.createdAt).toString()
    )
}
