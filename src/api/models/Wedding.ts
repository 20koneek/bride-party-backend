import { Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { BaseModel, Contest, Guest } from './'

@Entity()
export class Wedding extends BaseModel {

    // @IsNotEmpty()
    // @Column({ name: 'man_name' })
    // public manName: string
    //
    // @IsNotEmpty()
    // @Column({ name: 'woman_name' })
    // public womanName: string

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
}
