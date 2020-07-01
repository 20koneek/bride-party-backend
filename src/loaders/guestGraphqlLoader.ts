import { ApolloServer } from 'apollo-server-express'
import { Application } from 'express'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import * as path from 'path'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { env } from '../env'
import { Context } from '../types/Context'
import { app } from 'firebase-admin'
import { TheMap } from '../lib/theMap'

export const guestGraphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp: Application = settings.getData('express_app')
        const firebase: app.App = settings.getData('firebase')
        const theMap: TheMap = settings.getData('the_map')

        const schema = await buildSchema({
            resolvers: env.app.dirs.guestResolvers,
            container: Container,
            emitSchemaFile: path.resolve(__dirname, '../api/schemas', 'guest.gql'),
        })

        const apolloServer = new ApolloServer({
            introspection: env.isDevelopment,
            playground: env.isDevelopment,
            schema,
            context: ({ req, connection }): Context => ({
                token: `${(connection ? connection.context : req.headers).token}`,
                firebase,
                theMap,
            }),
        })

        apolloServer.applyMiddleware({ app: expressApp, path: env.graphql.guestRoute })
    }
}