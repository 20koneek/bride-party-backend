import helmet from 'helmet'
import { NextFunction, Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class SecurityMiddleware implements ExpressMiddlewareInterface {

  public use(req: Request, res: Response, next: NextFunction): any {
    return helmet()(req, res, next)
  }
}
