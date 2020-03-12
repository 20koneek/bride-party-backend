import { IsNotEmpty } from 'class-validator'
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm'
import { BaseModel, ContestCondition, Wedding } from './'

@Entity()
export class Contest extends BaseModel {

    @IsNotEmpty()
    @Column()
    public name: string

    @OneToMany(
        () => ContestCondition,
        ({ contest }) => contest,
        { lazy: true },
    )
    public conditions: ContestCondition[]

    @ManyToMany(
        () => Wedding,
        ({ contests }) => contests,
        { lazy: true },
    )
    @JoinTable({
        name: 'contest_wedding',
        joinColumn: {
            name: 'contest_id',
        },
        inverseJoinColumn: {
            name: 'wedding_id',
        },
    })
    public weddings: Wedding[]
}
