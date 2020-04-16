import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn,  OneToMany, OneToOne } from 'typeorm'
import { BaseModel, Post, Wedding } from './'

@Entity()
export class Feed extends BaseModel {

    @Column({ name: 'wedding_id' })
    @IsNotEmpty()
    public weddingId: string

    @OneToOne(
        () => Wedding,
        ({ feed }) => feed,
        { lazy: true },
    )
    @JoinColumn({ name: 'wedding_id' })
    public wedding: Wedding

    @OneToMany(
        () => Post,
        ({ feed }) => feed,
        { lazy: true },
    )
    public posts: Post[]
}
