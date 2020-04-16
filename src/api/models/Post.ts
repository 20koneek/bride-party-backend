import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel, Feed, Guest } from './'

@Entity()
export class Post extends BaseModel {

    @Column({ name: 'guest_id' })
    @IsNotEmpty()
    public guestId: string

    @ManyToOne(
        () => Guest,
        ({ posts }) => posts,
        { lazy: true },
    )
    @JoinColumn({ name: 'guest_id' })
    public guest: Guest

    @Column({ name: 'feed_id' })
    @IsNotEmpty()
    public feedId: string

    @ManyToOne(
        () => Feed,
        ({ posts }) => posts,
        { lazy: true },
    )
    @JoinColumn({ name: 'feed_id' })
    public feed: Feed
}
