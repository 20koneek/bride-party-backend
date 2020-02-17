const src = process.env.NODE_ENV === 'production'
  ? require('./dist/env.js')
  : require('./src/env.ts')

const baseOption = {
  type: src.env.db.type,
  uuidExtension: 'uuid-ossp',
  synchronize: src.env.db.synchronize,
  logging: src.env.db.logging,
  entities: src.env.app.dirs.entities,
  migrations: src.env.app.dirs.migrations,
  migrationsDir: src.env.app.dirs.migrationsDir,
}

const connectionOptions = src.env.isProduction ? {
  ...baseOption,
  url: src.env.db.databaseUrl,
  ssl: true,
} : {
  ...baseOption,
  host: src.env.db.host,
  port: src.env.db.port,
  username: src.env.db.username,
  password: src.env.db.password,
  database: src.env.db.database,
}

module.exports = connectionOptions
