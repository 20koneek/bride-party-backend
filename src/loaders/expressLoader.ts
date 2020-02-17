import { Application } from 'express'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { createExpressServer } from 'routing-controllers'
import { env } from '../env'

export const expressLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
  if (settings) {
    const expressApp: Application = createExpressServer({
      cors: env.isDevelopment || {
        origin: 'https://where-cheaper-frontend-staging.herokuapp.com',
      },
      classTransformer: true,
      defaultErrorHandler: false,
      routePrefix: env.app.routePrefix,
      controllers: env.app.dirs.controllers,
      middlewares: env.app.dirs.middlewares,
      interceptors: env.app.dirs.interceptors,
    })

    if (!env.isTest) {
      const server = expressApp.listen(env.app.port)
      settings.setData('express_server', server)
    }

    settings.setData('express_app', expressApp)
  }
}
