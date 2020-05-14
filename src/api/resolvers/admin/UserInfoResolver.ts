import { Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { CurrentUidMiddleware } from '../middlewares'
import { UserInfo } from '../../types/UserInfo'

@Service()
@Resolver()
export class UserInfoResolver {

    constructor() {
    }

    @Query(() => String)
    @UseMiddleware(CurrentUidMiddleware)
    public userInfo(): string {
        return 'Test'
    }

    @Query(() => String)
    @UseMiddleware(CurrentUidMiddleware)
    public userInfoCreate(

    ): UserInfo {
        return null
    }
}
