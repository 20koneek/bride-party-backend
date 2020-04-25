import { Column, Table, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { BaseModel, Feed, Guest, UUIDColumn } from './'

@Table
export class Post extends BaseModel<Post> {

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
}
