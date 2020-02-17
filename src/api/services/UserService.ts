// import { Service } from 'typedi'
//
// import { Logger, LoggerInterface } from '../../decorators/Logger'
// import { User } from '../models'
//
// @Service()
// export class UserService {
//
//   constructor(
//     @Logger(__filename) private log: LoggerInterface,
//   ) {
//   }
//
//   public all(): Promise<User[]> {
//     this.log.info('Find all checks')
//     return User.find({ id: '1' })
//   }
//
//   public async create(user: User): Promise<User> {
//     return await User.save(user)
//   }
//
//   public findBy(uid: string): Promise<User | undefined> {
//     return User.findOne({ uid })
//   }
//
//   public findByLogin(login: string): Promise<User | undefined> {
//     return User.findOne({
//       where: `email = '${login}' or phone = '${login}'`,
//     })
//   }
// }
