import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from './BaseModel'
import { SHA1 } from 'crypto-js'
import v4 from 'uuid/v4'

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

    public getPassword = (): string => (
        SHA1(this.salt + this.updatedAt).toString()
    )
}
