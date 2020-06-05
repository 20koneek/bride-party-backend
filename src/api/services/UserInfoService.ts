import { Service } from 'typedi'
import { UserInfo } from '../models'
import { UserInfoInput } from '../types'

@Service()
export class UserInfoService {

    public find = async ({ uid }: { uid: string }): Promise<UserInfo | null> => (
        UserInfo.findOne({ where: { userId: uid } })
    )

    public update = async ({ uid, input }: { uid: string, input: UserInfoInput }): Promise<UserInfo> => {
        const [userInfo] = await UserInfo.findOrCreate({
            where: { userId: uid },
            defaults: input,
        })

        return userInfo
    }
}
