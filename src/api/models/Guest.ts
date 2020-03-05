import v4 from 'uuid/v4'
import { SHA1 } from 'crypto-js'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, OneToMany } from 'typeorm'
import { BaseModel, Payment } from './'

@Entity()
@Index(['uid'], { unique: true })
export class Guest extends BaseModel {

    constructor() {
        super()
        this.salt = SHA1(v4()).toString()
    }

    @IsNotEmpty()
    @Column()
    public name: string

    @IsNotEmpty()
    @Column()
    public uid: string

    @IsNotEmpty()
    @Column()
    public salt: string

    @OneToMany(
        () => Payment,
        ({ guest }) => guest,
        { lazy: true },
    )
    public payments: Payment[]

    public getPassword = (): string => (
        SHA1(this.salt + this.updatedAt).toString()
    )
}
