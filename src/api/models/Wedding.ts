import { BelongsToMany, Column, HasMany, HasOne, Table } from 'sequelize-typescript'
import { BaseModel, Contest, ContestWedding, Feed, Guest } from './'

@Table
export class Wedding extends BaseModel<Wedding> {

    @Column({ allowNull: false })
    public name: string

    @HasMany(() => Guest)
    public guests: Guest[]

    @BelongsToMany(() => Contest, () => ContestWedding)
    public contests: Contest[]

    @HasOne(() => Feed)
    public feed: Feed
}
