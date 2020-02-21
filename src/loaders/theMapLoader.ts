import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { TheMap } from '../lib/theMap'
import { env } from '../env'

export const theMapLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const theMap = new TheMap(
            env.theMap.domain,
            env.theMap.key,
            env.theMap.keyPassword,
        )

        console.log(await theMap.init({
            type: 'Add',
            userLogin: 'test',
            userPassword: '123',
            // orderId: '1234',
            // amount: 1,
        }))
    }
}
