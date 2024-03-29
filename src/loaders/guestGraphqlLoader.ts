import { ApolloServer } from 'apollo-server-express'
import { Application } from 'express'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { env } from '../env'
import { Context } from '../types/Context'
import { app } from 'firebase-admin'
import { TheMap } from '../lib/theMap'
import { getPath } from '../lib/env'

export const guestGraphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp: Application = settings.getData('express_app')
        const firebase: app.App = settings.getData('firebase')
        const theMap: TheMap = settings.getData('the_map')
        const pubSub: RedisPubSub = settings.getData('pub_sub')

        const schema = await buildSchema({
            pubSub,
            resolvers: env.app.dirs.guestResolvers,
            container: Container,
            emitSchemaFile: getPath('src/api/schemas/guest.gql'),
        })

        const apolloServer = new ApolloServer({
            schema,
            introspection: env.graphql.editor,
            playground: env.graphql.editor,
            context: ({ req, connection }): Context => ({
                token: (connection ? connection.context : req.headers).token,
                firebase,
                theMap,
            }),
        })

        apolloServer.applyMiddleware({ app: expressApp, path: env.graphql.guestRoute })
    }
}
