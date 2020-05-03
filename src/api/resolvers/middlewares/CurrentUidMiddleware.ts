import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { Context } from '../../../types/Context'

export class CurrentUidMiddleware implements MiddlewareInterface<Context> {

    public use = async ({ context }: ResolverData<Context>, next: NextFn) => {
        if (!context.token) {
            throw new Error('Not auth')
        }

        const { uid } = await context.firebase.auth().verifyIdToken(context.token)

        if (!uid) {
            throw new Error('not auth')
        }

        context.uid = uid

        return next()
    }
}
