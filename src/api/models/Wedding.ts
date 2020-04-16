import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from 'typeorm'
import { IsNotEmpty } from 'class-validator'
import { BaseModel, Contest, Feed, Guest } from './'

@Entity()
export class Wedding extends BaseModel {

    @IsNotEmpty()
    @Column()
    public name: string

    @OneToMany(
        () => Guest,
        ({ wedding }) => wedding,
        { lazy: true },
    )
    public guests: Guest[]

    @ManyToMany(
        () => Contest,
        ({ weddings }) => weddings,
        { lazy: true },
    )
    @JoinTable({
        name: 'contest_wedding',
        joinColumn: {
            name: 'wedding_id',
        },
        inverseJoinColumn: {
            name: 'contest_id',
        },
    })
    public contests: Contest[]

    @OneToOne(
        () => Feed,
        ({ wedding }) => wedding,
        { lazy: true },
    )
    public feed: Feed
}
