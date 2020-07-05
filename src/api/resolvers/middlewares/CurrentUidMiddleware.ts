import { MiddlewareInterface, NextFn, ResolverData } from 'type-graphql'
import { Context } from '../../../types/Context'

export class CurrentUidMiddleware implements MiddlewareInterface<Context> {

    public use = async ({ context, args }: ResolverData<Context>, next: NextFn) => {
        const token = context.token || args.token

        if (!token) {
            throw new Error('Not auth')
        }

        const { uid } = await context.firebase.auth().verifyIdToken(token)

        if (!uid) {
            throw new Error('not auth')
        }

        context.uid = uid

        return next()
    }
}
