// import { IsEmail, IsPhoneNumber, MaxLength } from 'class-validator'
// import { Field, ID, ObjectType } from 'type-graphql'
//
// import { User as UserModel } from '../models'
//
// @ObjectType({
//   description: 'Check object.',
// })
// export class User {
//
//   @Field(() => ID, {
//     description: 'Check object.',
//   })
//   public id: string
//
//   @IsEmail()
//   @Field({
//     nullable: true,
//     description: 'Check object.',
//   })
//   public email?: string
//
//   @MaxLength(15)
//   @IsPhoneNumber('ru')
//   @Field({
//     nullable: true,
//     description: 'Check object.',
//   })
//   public phone?: string
//
//   @Field({
//     nullable: true,
//     description: 'Check object.',
//   })
//   public firstName?: string
//
//   constructor(user?: UserModel) {
//     if (user) {
//       this.id = user.id
//       this.email = user.email
//       this.phone = user.phone
//       this.firstName = user.firstName
//     }
//   }
// }
