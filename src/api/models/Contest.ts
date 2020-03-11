import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany } from 'typeorm'
import { BaseModel, ContestCondition } from './'

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
}
