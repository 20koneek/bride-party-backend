import { BelongsToMany, Column, HasMany, Table } from 'sequelize-typescript'
import { BaseModel, Contest, ContestWedding, Guest, Post } from './'

@Table
export class Wedding extends BaseModel<Wedding> {

    @Column({ allowNull: false })
    public name: string

    @HasMany(() => Guest)
    public guests: Guest[]

    @BelongsToMany(() => Contest, () => ContestWedding)
    public contests: Contest[]

    @HasMany(() => Post)
    public posts: Post[]
}
