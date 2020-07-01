import express, { Express } from 'express'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { createServer, Server } from 'http'
import { env } from '../env'

export const expressLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp: Express = express()
        const httpServer: Server = createServer(expressApp)

        httpServer.listen({ port: env.app.port })

        settings.setData('express_app', expressApp)
        settings.setData('http_server', httpServer)
    }
}
