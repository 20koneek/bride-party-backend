import compression from 'compression'
import { NextFunction, Request, Response } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class CompressionMiddleware implements ExpressMiddlewareInterface {

  public use(req: Request, res: Response, next: NextFunction): any {
    return compression()(req, res, next)
  }
}
