import { IsNotEmpty } from 'class-validator'
import { Column, Entity, Index } from 'typeorm'
import { BaseModel } from './BaseModel'

@Entity()
@Index(['firebaseUid'], { unique: true })
export class Guest extends BaseModel {

    @IsNotEmpty()
    @Column()
    public name: string

    @IsNotEmpty()
    @Column({ name: 'firebase_uid' })
    public firebaseUid: string
}
