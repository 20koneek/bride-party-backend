import { v4 } from 'uuid'
import { SHA1 } from 'crypto-js'
import {
    BelongsTo,
    Column,
    DataType,
    Default,
    ForeignKey,
    HasMany,
    Index,
    Table,
} from 'sequelize-typescript'
import { CardStatus } from '../types/enums'
import { BaseModel, GuestCard, Payment, Post, Wedding } from './'

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

    @Default(CardStatus.NotSet)
    @Column(DataType.ENUM({ values: Object.keys(CardStatus) }))
    public cardStatus: CardStatus

    @ForeignKey(() => Wedding)
    @Column({
        allowNull: false,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    public weddingId: string

    @BelongsTo(() => Wedding)
    public wedding: Wedding

    @HasMany(() => Payment)
    public payments: Payment[]

    @HasMany(() => GuestCard)
    public cards: GuestCard[]

    @HasMany(() => Post)
    public posts: Post[]

    public getPassword = (): string => (
        SHA1(this.salt + this.createdAt).toString()
    )
}
