import { Service } from 'typedi'
import { UserInfo } from '../models'
import { UserInfoInput } from '../types'

@Service()
export class UserInfoService {

    public find = async ({ uid }: { uid: string }): Promise<UserInfo | null> => (
        UserInfo.findOne({ where: { userId: uid } })
    )

    public update = async ({ uid, input }: { uid: string, input: UserInfoInput }): Promise<UserInfo> => {
        const [userInfo] = await UserInfo.findOrBuild({
            where: { userId: uid },
        })
        userInfo.firstName = input.firstName
        userInfo.lastName = input.lastName

        return userInfo.save()
    }
}
