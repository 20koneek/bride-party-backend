// import { Arg, Ctx, Mutation, Resolver } from 'type-graphql'
// import { Service } from 'typedi'
// import { User as UserModel } from '../models'
// import { SignUpInput, SignUpOutput, User } from '../types'
// import { Context } from '../../types/Context'
// import { UserService } from '../services'
//
// @Service()
// @Resolver(of => User)
// export class UserResolver {
//   constructor(
//     private userService: UserService,
//   ) {
//   }
//
//   // @Mutation(() => SignUpOutput, {
//   //   description: 'Sign up.',
//   // })
//   // public async signUp(@Arg('user') user: SignUpInput, @Ctx() { firebase, token }: Context): Promise<SignUpOutput> {
//   //   const newUser = new UserModel()
//   //   newUser.email = user.email || ''
//   //   newUser.phone = user.phone
//   //   newUser.firstName = user.firstName || ''
//   //   newUser.password = user.password
//   //
//   //   const salt = newUser.createSession()
//   //   const result = await this.userService.create(newUser)
//   //
//   //   const outputData = new SignUpOutput(result)
//   //   outputData.authToken = salt
//   //
//   //   return outputData
//   // }
// }
