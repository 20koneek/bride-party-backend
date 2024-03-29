import * as helmet from 'helmet'
import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export class SecurityNoCacheMiddleware implements ExpressMiddlewareInterface {

    public use(req: Request, res: Response, next: NextFunction): any {
        return helmet.noCache()(req, res, next)
    }
}
