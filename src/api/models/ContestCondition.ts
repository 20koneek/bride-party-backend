import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel, Contest, Payment } from './'

@Entity({ name: 'contest_condition' })
export class ContestCondition extends BaseModel {

    @IsNotEmpty()
    @Column()
    public name: string

    @Column({ name: 'contest_id' })
    public contestId: string

    @ManyToOne(
        () => Contest,
        ({ conditions }) => conditions,
        { lazy: true },
    )
    @JoinColumn({ name: 'contest_id' })
    public contest: Contest

    @OneToMany(
        () => Payment,
        ({ guest }) => guest,
        { lazy: true },
    )
    public payments: Payment[]

}
