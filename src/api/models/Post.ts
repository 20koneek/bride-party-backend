import { Column, Table, BelongsTo, ForeignKey, Default, HasMany } from 'sequelize-typescript'
import { Attachment, BaseModel, Feed, Guest, UUIDColumn } from './'

@Table
export class Post extends BaseModel<Post> {

    @Default('')
    @Column({ allowNull: false })
    public message: string

    @ForeignKey(() => Guest)
    @Column(UUIDColumn)
    public guestId: string

    @ForeignKey(() => Feed)
    @Column(UUIDColumn)
    public feedId: string

    @BelongsTo(() => Guest)
    public guest: Guest

    @BelongsTo(() => Feed)
    public feed: Feed

    @HasMany(()=> Attachment)
    public attachments: Attachment[]
}
