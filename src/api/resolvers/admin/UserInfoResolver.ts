import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { Service } from 'typedi'
import { CurrentUidMiddleware } from '../middlewares'
import { UserInfo, UserInfoInput } from '../../types'
import { ContextWithRequired } from '../../../types/Context'
import { UserInfoService } from '../../services'

@Service()
@Resolver()
export class UserInfoResolver {

    constructor(
        private service: UserInfoService,
    ) {
    }

    @Query(
        () => UserInfo,
        { nullable: true },
    )
    @UseMiddleware(CurrentUidMiddleware)
    public userInfo(
        @Ctx() { uid }: ContextWithRequired,
    ): Promise<UserInfo | null> {
        return this.service.find({ uid })
    }

    @Mutation(() => UserInfo)
    @UseMiddleware(CurrentUidMiddleware)
    public userInfoUpdate(
        @Ctx() { uid }: ContextWithRequired,
        @Arg('input') input: UserInfoInput,
    ): Promise<UserInfo> {
        return this.service.update({ uid, input })
    }
}
