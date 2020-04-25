import { BelongsTo, Column, ForeignKey, HasMany, Table } from 'sequelize-typescript'
import { BaseModel, Post, UUIDColumn, Wedding } from './'

@Table
export class Feed extends BaseModel<Feed> {

    @ForeignKey(() => Wedding)
    @Column(UUIDColumn)
    public weddingId: string

    @BelongsTo(() => Wedding)
    public wedding: Wedding

    @HasMany(() => Post)
    public posts: Post[]
}
