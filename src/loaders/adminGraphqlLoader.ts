import { Server } from 'http'
import { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { buildSchema } from 'type-graphql'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { Container } from 'typedi'
import { app } from 'firebase-admin'
import { env } from '../env'
import { Context } from '../types/Context'
import { TheMap } from '../lib/theMap'
import { getPath } from '../lib/env'

export const adminGraphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp: Application = settings.getData('express_app')
        const httpServer: Server = settings.getData('http_server')
        const firebase: app.App = settings.getData('firebase')
        const theMap: TheMap = settings.getData('the_map')
        const pubSub: RedisPubSub = settings.getData('pub_sub')

        const schema = await buildSchema({
            pubSub,
            resolvers: env.app.dirs.adminResolvers,
            container: Container,
            emitSchemaFile: getPath('src/api/schemas/admin.gql'),
        })

        const apolloServer = new ApolloServer({
            schema,
            introspection: env.graphql.editor,
            playground: env.graphql.editor,
            subscriptions: env.graphql.adminRoute,
            context: ({ req, connection }): Context => ({
                token: (connection ? connection.context : req.headers).token,
                firebase,
                theMap,
            }),
        })

        apolloServer.applyMiddleware({ app: expressApp, path: env.graphql.adminRoute })
        apolloServer.installSubscriptionHandlers(httpServer)
    }
}
