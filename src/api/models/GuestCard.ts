import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel, Guest } from './'

@Entity({ name: 'guest_card' })
export class GuestCard extends BaseModel {

    @IsNotEmpty()
    @Column({ name: 'pan_mask' })
    public panMask: string

    @IsNotEmpty()
    @Column({ name: 'card_uid' })
    public cardUid: string

    @IsNotEmpty()
    @Column()
    public month: number

    @IsNotEmpty()
    @Column()
    public year: number

    @IsNotEmpty()
    @Column()
    public status: string

    @IsNotEmpty()
    @Column({ name: 'card_holder' })
    public cardHolder: string

    @Column({ name: 'guest_id' })
    public guestId: string

    @ManyToOne(
        () => Guest,
        ({ cards }) => cards,
        { lazy: true },
    )
    @JoinColumn({ name: 'guest_id' })
    public guest: Guest
}
