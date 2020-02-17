import * as helmet from 'helmet'
import { NextFunction, Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class SecurityHstsMiddleware implements ExpressMiddlewareInterface {

  public use(req: Request, res: Response, next: NextFunction): any {
    return helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
    })(req, res, next)
  }
}
