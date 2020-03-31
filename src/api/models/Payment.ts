import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel, ContestCondition, Guest } from './'
import { Status } from '../types/enums'

@Entity()
export class Payment extends BaseModel {

    @IsNotEmpty()
    @Column()
    public amount: number

    @IsNotEmpty()
    @Column('enum', {
        enum: Status,
        default: () => Status.Init,
    })
    public status: Status

    @Column({ name: 'guest_id' })
    public guestId: string

    @ManyToOne(
        () => Guest,
        ({ payments }) => payments,
        { lazy: true },
    )
    @JoinColumn({ name: 'guest_id' })
    public guest: Guest

    @Column({
        name: 'contest_condition_id',
        nullable: true,
    })
    public contestConditionId?: string

    @ManyToOne(
        () => ContestCondition,
        ({ payments }) => payments,
        { lazy: true, nullable: true },
    )
    @JoinColumn({ name: 'contest_condition_id' })
    public contestCondition?: ContestCondition
}
