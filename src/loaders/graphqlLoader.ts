import { Request, Response } from 'express'
import GraphQLHTTP from 'express-graphql'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import * as path from 'path'
import { buildSchema } from 'type-graphql'
import Container, { Container as SchemaContainer } from 'typedi'
import { env } from '../env'
import { getErrorCode, getErrorMessage, handlingErrors } from '../lib/graphql'
import { Context } from '../types/Context'
import { app } from 'firebase-admin'

export const graphqlLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  if (settings && env.graphql.enabled) {
    const expressApp = settings.getData('express_app')
    const firebase: app.App = settings.getData('firebase')

    const schema = await buildSchema({
      resolvers: env.app.dirs.resolvers,
      container: SchemaContainer,
      emitSchemaFile: path.resolve(__dirname, '../api', 'schema.gql'),
    })

    handlingErrors(schema)

    expressApp.use(env.graphql.route, (request: Request, response: Response) => {
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
      }

      container.set('context', context)

      GraphQLHTTP({
        schema,
        context,
        graphiql: env.graphql.editor,
        customFormatErrorFn: (error) => ({
          code: getErrorCode(error.message),
          message: getErrorMessage(error.message),
          path: error.path,
        }),
      })(request, response)
    })
  }
}
