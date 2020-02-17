import { NextFunction, Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers'

import { env } from '../env'
import { Logger, LoggerInterface } from '../decorators/Logger'

@Middleware({ type: 'after' })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

  public isProduction = env.isProduction

  constructor(
    @Logger(__filename) private log: LoggerInterface,
  ) {
  }

  public error(error: HttpError, req: Request, res: Response, next: NextFunction): void {
    res.status(error.httpCode || 500)
    res.json({
      name: error.name,
      message: error.message,
      errors: error[`errors`] || [],
    })

    this.log.error(error.name, this.isProduction ? error.message : error.stack)
  }
}
