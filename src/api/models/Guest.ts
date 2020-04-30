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
import { BaseModel, GuestCard, Payment, Post, UUIDColumn, Wedding } from './'

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

    @Index({ unique: true })
    @Column({ allowNull: false })
    public uid: string

    @Column({ allowNull: false })
    public salt: string

    @ForeignKey(() => Wedding)
    @Column(UUIDColumn)
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
