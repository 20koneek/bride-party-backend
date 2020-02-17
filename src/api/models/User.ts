// import { IsEmail, IsNotEmpty, IsPhoneNumber, MaxLength } from 'class-validator'
// import { Column, Entity, Index } from 'typeorm'
//
// import { BaseModel } from './BaseModel'
//
// @Entity()
// @Index(['uid'], { unique: true })
// export class User extends BaseModel {
//
//   @Column()
//   @IsEmail()
//   public email: string
//
//   @Column()
//   @MaxLength(15)
//   @IsPhoneNumber('ru')
//   public phone: string
//
//   @Column({ name: 'first_name' })
//   public firstName: string
//
//   @IsNotEmpty()
//   @Column()
//   public uid: string
// }
