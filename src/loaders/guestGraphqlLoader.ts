import { Request, Response } from 'express'
import GraphQLHTTP from 'express-graphql'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import * as path from 'path'
import { buildSchema } from 'type-graphql'
import Container, { Container as SchemaContainer } from 'typedi'
import { env } from '../env'
import { Context } from '../types/Context'
import { app } from 'firebase-admin'
import { TheMap } from '../lib/theMap'
import { graphqlUploadExpress } from 'graphql-upload'

export const guestGraphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings && env.graphql.enabled) {
        const expressApp = settings.getData('express_app')
        const firebase: app.App = settings.getData('firebase')
        const theMap: TheMap = settings.getData('the_map')

        const schema = await buildSchema({
            resolvers: [path.resolve(__dirname, '../..'), ...env.app.dirs.guestResolvers],
            container: SchemaContainer,
            emitSchemaFile: path.resolve(__dirname, '../api/schemas', 'guest.gql'),
        })

        expressApp.use(
            env.graphql.guestRoute,
            graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }),
            (request: Request, response: Response) => {
                const token = `${request.headers.token}`
                const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
                const container = Container.of(requestId)
                const context: Context = {
                    requestId,
                    container,
                    request,
                    response,
                    token,
                    firebase,
                    theMap,
                }

                container.set('context', context)

                GraphQLHTTP({
                    schema,
                    context,
                    graphiql: env.graphql.editor,
                })(request, response)
            },
        )
    }
}
