import morgan from 'morgan'
import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

import { env } from '../env'
import { Logger } from '../lib/logger'

@Middleware({ type: 'before' })
export class LogMiddleware implements ExpressMiddlewareInterface {

  private log = new Logger(__dirname)

  public use(req: Request, res: Response, next: NextFunction): any {
    return morgan(env.log.output, {
      stream: {
        write: this.log.info.bind(this.log),
      },
    })(req, res, next)
  }
}
