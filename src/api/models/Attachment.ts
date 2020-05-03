import {
    BelongsTo,
    Column,
    ForeignKey,
    Index,
    Table,
} from 'sequelize-typescript'
import { BaseModel, GroupIndex, Post, UUIDColumn } from './'

@Table
export class Attachment extends BaseModel<Attachment> {

    @ForeignKey(() => Post)
    @Column(UUIDColumn)
    public postId: string

    @BelongsTo(() => Post)
    public post: Post

    @Index
    @GroupIndex
    @Column({ ...UUIDColumn, field: 'attachmentableId' })
    public attachmentableId: string

    @Index
    @GroupIndex
    @Column({ allowNull: false, field: 'attachmentableType' })
    public attachmentableType: string
}
