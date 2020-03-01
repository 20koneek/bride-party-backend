import { IsNotEmpty } from 'class-validator'
import { Column, Entity } from 'typeorm'
import { BaseModel } from './'

@Entity()
export class Payment extends BaseModel {

    @IsNotEmpty()
    @Column()
    public amount: number

    @IsNotEmpty()
    @Column()
    public status: string

    @Column({ name: 'guest_id' })
    public guestId: string

    // @ManyToOne(
    //     () => Guest,
    //     ({ payments }) => payments,
    //     { lazy: true },
    // )
    // @JoinColumn({ name: 'guest_id' })
    // public guest: Guest
}
