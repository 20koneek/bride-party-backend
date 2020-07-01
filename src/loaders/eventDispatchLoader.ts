import glob from 'glob'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { env } from '../env'

export const eventDispatchLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const patterns = env.app.dirs.subscribers

        patterns.forEach((pattern) => {
            glob(pattern, (err: any, files: string[]) => {
                for (const file of files) {
                    require(file)
                }
            })
        })
    }
}
