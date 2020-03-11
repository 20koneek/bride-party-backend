import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel, Guest } from './'

@Entity()
export class Wedding extends BaseModel {

    // @IsNotEmpty()
    // @Column({ name: 'man_name' })
    // public manName: string
    //
    // @IsNotEmpty()
    // @Column({ name: 'woman_name' })
    // public womanName: string

    @IsNotEmpty()
    @Column({ name: 'guest_id' })
    public guestId: string

    @OneToMany(
        () => Guest,
        ({ wedding }) => wedding,
        { lazy: true },
    )
    public guests: Guest[]
}
