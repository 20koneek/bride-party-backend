import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec'
import { createConnection, getConnectionOptions } from 'typeorm'

import { env } from '../env'

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const loadedConnectionOptions = await getConnectionOptions()

    const baseOption = {
        ...loadedConnectionOptions,
        type: env.db.type as any,
        uuidExtension: 'uuid-ossp' as any,
        synchronize: env.db.synchronize,
        logging: env.db.logging as 'all',
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
    }

    const connectionOptions = env.isProduction ? {
        ...baseOption,
        url: env.db.databaseUrl,
        ssl: true,
    } : {
        ...baseOption,
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
    }

    const connection = await createConnection(connectionOptions)

    if (settings) {
        settings.setData('connection', connection)
        settings.onShutdown(() => connection.close())
    }
}
