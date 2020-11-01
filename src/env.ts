import * as dotenv from 'dotenv'
import * as path from 'path'
import * as pkg from '../package.json'
import { getOsEnv, getOsEnvOptional, getPaths, normalizePort, toBool, toNumber } from './lib/env'

/**
 * Load .env file or for tests the .env.test file.
 */
dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) })

/**
 * Environment variables
 */
export const env = {
    node: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isTest: process.env.NODE_ENV === 'test',
    isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        port: normalizePort(process.env.PORT || getOsEnvOptional('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            controllers: getPaths('src/api/controllers/**/*Controller.ts'),
            middlewares: getPaths('src/middlewares/**/*Middleware.ts'),
            interceptors: getPaths('src/api/interceptors/**/*Interceptor.ts'),
            subscribers: getPaths('src/api/subscribers/**/*Subscriber.ts'),
            adminResolvers: getPaths('src/api/resolvers/admin/*Resolver.ts'),
            guestResolvers: getPaths('src/api/resolvers/guest/*Resolver.ts'),
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        databaseUrl: getOsEnvOptional('DATABASE_URL'),
        host: getOsEnvOptional('HOST'),
        port: toNumber(getOsEnvOptional('DATABASE_PORT')),
        username: getOsEnvOptional('USERNAME'),
        password: getOsEnvOptional('PASSWORD'),
        database: getOsEnvOptional('DATABASE'),
        logging: getOsEnvOptional('LOGGING'),
    },
    graphql: {
        enabled: toBool(getOsEnv('GRAPHQL_ENABLED')),
        adminRoute: getOsEnv('GRAPHQL_ADMIN_ROUTE'),
        guestRoute: getOsEnv('GRAPHQL_GUEST_ROUTE'),
        editor: toBool(getOsEnv('GRAPHQL_EDITOR')),
    },
    firebase: {
        databaseUrl: getOsEnv('FIREBASE_DATABASE_URL'),
    },
    theMap: {
        domain: getOsEnv('THE_MAP_DOMAIN'),
        merchant: getOsEnv('THE_MAP_MERCHANT'),
        key: getOsEnv('THE_MAP_KEY'),
        merchantPassword: getOsEnv('THE_MAP_MERCHANT_PASSWORD'),
        keyPassword: getOsEnv('THE_MAP_KEY_PASSWORD'),
        hostUrl: getOsEnv('THE_MAP_HOST_URL'),
    },
}
