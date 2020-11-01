import express, { Express } from 'express'
import Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { createServer, Server } from 'http'
import { env } from '../env'

export const expressLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp: Express = express()
        const httpServer: Server = createServer(expressApp)
        const pubSub = env.app.redisUrl
            ? new RedisPubSub({
                publisher: new Redis(env.app.redisUrl),
                subscriber: new Redis(env.app.redisUrl),
            })
            : new RedisPubSub()

        httpServer.listen({ port: env.app.port })

        settings.setData('express_app', expressApp)
        settings.setData('http_server', httpServer)
        settings.setData('pub_sub', pubSub)
    }
}
