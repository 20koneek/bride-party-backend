import { v4 } from 'uuid'
import { SHA1 } from 'crypto-js'
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel, Payment, Wedding } from './'

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

    @Column({ name: 'wedding_id' })
    public weddingId: string

    @ManyToOne(
        () => Wedding,
        ({ guests }) => guests,
        { lazy: true },
    )
    @JoinColumn({ name: 'wedding_id' })
    public wedding: Wedding

    public getPassword = (): string => (
        SHA1(this.salt + this.updatedAt).toString()
    )
}
