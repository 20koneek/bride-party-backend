import { Column, Table, BelongsTo, ForeignKey, Default, HasMany } from 'sequelize-typescript'
import { Attachment, BaseModel, Guest, UUIDColumn, Wedding } from './'

@Table
export class Post extends BaseModel<Post> {

    @Default('')
    @Column({ allowNull: false })
    public message: string

    @ForeignKey(() => Guest)
    @Column(UUIDColumn)
    public guestId: string

    @ForeignKey(() => Wedding)
    @Column(UUIDColumn)
    public weddingId: string

    @BelongsTo(() => Guest)
    public guest: Guest

    @BelongsTo(() => Wedding)
    public wedding: Wedding

    @HasMany(() => Attachment)
    public attachments: Attachment[]
}
