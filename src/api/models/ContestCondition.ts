import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseModel, Contest } from './'

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
    @JoinColumn({ name: 'wedding_id' })
    public contest: Contest
}
