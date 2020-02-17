// import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
// import { Service } from 'typedi'
// import { Context } from '../../../types/Context'
// import { UserService } from '../../services'
// import { User as UserModel } from '../../models'
//
// export class CurrentUserMiddleware implements MiddlewareInterface<Context> {
//   constructor(
//     @Service() private userService: UserService,
//   ) {
//   }
//
//   public use = async ({ context }: ResolverData<Context>, next: NextFn) => {
//     if (!context.token) {
//       throw new Error('Not auth')
//     }
//
//     const { uid, email } = await context.firebase.auth().verifyIdToken(context.token)
//     let currentUser = await this.userService.findBy(uid)
//
//     if (!currentUser) {
//       const newUser = new UserModel()
//       newUser.uid = uid
//       newUser.email = email
//
//       currentUser = await this.userService.create(newUser)
//     }
//
//     if (currentUser) {
//       context.currentUser = currentUser
//       return next()
//     }
//
//     throw new Error('Not auth')
//   }
// }
