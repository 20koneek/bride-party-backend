import { BelongsToMany, Column, HasMany, Index, Table } from 'sequelize-typescript'
import { BaseModel, Contest, ContestWedding, Guest, Post } from './'

@Table
export class Wedding extends BaseModel<Wedding> {

    @Column({ allowNull: false })
    public title: string

    @Column({ allowNull: false })
    public description: string

    @Index
    @Column({ allowNull: false })
    public uid: string

    @Index
    @Column({ allowNull: false, field: 'startDate' })
    public startDate: Date

    @Index
    @Column({ allowNull: false, field: 'endDate' })
    public endDate: Date

    @HasMany(() => Guest)
    public guests: Guest[]

    @BelongsToMany(() => Contest, () => ContestWedding)
    public contests: Contest[]

    @HasMany(() => Post)
    public posts: Post[]
}
