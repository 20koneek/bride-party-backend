import * as dotenv from 'dotenv'
import * as path from 'path'

import * as pkg from '../package.json'
import { getOsEnv, getOsEnvOptional, getOsPath, getOsPaths, normalizePort, toBool, toNumber } from './lib/env'

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
    isDevelopment: process.env.NODE_ENV === 'development',
    app: {
        name: getOsEnv('APP_NAME'),
        version: (pkg as any).version,
        description: (pkg as any).description,
        host: getOsEnv('APP_HOST'),
        schema: getOsEnv('APP_SCHEMA'),
        routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
        port: normalizePort(process.env.PORT || getOsEnvOptional('APP_PORT')),
        banner: toBool(getOsEnv('APP_BANNER')),
        dirs: {
            migrations: getOsPaths('TYPEORM_MIGRATIONS'),
            migrationsDir: getOsPath('TYPEORM_MIGRATIONS_DIR'),
            entities: getOsPaths('TYPEORM_ENTITIES'),
            entitiesDir: getOsPath('TYPEORM_ENTITIES_DIR'),
            controllers: getOsPaths('CONTROLLERS'),
            middlewares: getOsPaths('MIDDLEWARES'),
            interceptors: getOsPaths('INTERCEPTORS'),
            subscribers: getOsPaths('SUBSCRIBERS'),
            resolvers: getOsPaths('RESOLVERS'),
        },
    },
    log: {
        level: getOsEnv('LOG_LEVEL'),
        json: toBool(getOsEnvOptional('LOG_JSON')),
        output: getOsEnv('LOG_OUTPUT'),
    },
    db: {
        databaseUrl: getOsEnvOptional('DATABASE_URL'),
        type: getOsEnv('CONNECTION'),
        host: getOsEnvOptional('HOST'),
        port: toNumber(getOsEnvOptional('DATABASE_PORT')),
        username: getOsEnvOptional('USERNAME'),
        password: getOsEnvOptional('PASSWORD'),
        database: getOsEnvOptional('DATABASE'),
        synchronize: toBool(getOsEnvOptional('SYNCHRONIZE')),
        logging: toBool(getOsEnvOptional('LOGGING')),
    },
    graphql: {
        enabled: toBool(getOsEnv('GRAPHQL_ENABLED')),
        route: getOsEnv('GRAPHQL_ROUTE'),
        editor: toBool(getOsEnv('GRAPHQL_EDITOR')),
    },
    firebase: {
        certCredential: {
            projectId: getOsEnv('PROJECT_ID'),
            privateKey: getOsEnv('PRIVATE_KEY'),
            clientEmail: getOsEnv('CLIENT_EMAIL'),
        },
        databaseUrl: getOsEnv('FIREBASE_DATABASE_URL'),
    },
    theMap: {
        domain: getOsEnv('THE_MAP_DOMAIN'),
        merchant: getOsEnv('THE_MAP_MERCHANT'),
        key: getOsEnv('THE_MAP_KEY'),
        merchantPassword: getOsEnv('THE_MAP_MERCHANT_PASSWORD'),
        keyPassword: getOsEnv('THE_MAP_KEY_PASSWORD'),
        successUrl: getOsEnv('THE_MAP_SUCCESS_URL'),
        failUrl: getOsEnv('THE_MAP_FAIL_URL'),
    },
}
