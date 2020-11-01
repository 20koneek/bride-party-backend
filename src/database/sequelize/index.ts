import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { env } from '../../env'

const { databaseUrl, logging, ...db } = env.db

const options: SequelizeOptions = {
    dialect: 'postgres',
    dialectOptions: {
        ssl: env.isProduction && {
            require: true,
            rejectUnauthorized: false,
        },
    },
    define: {
        underscored: true,
        timestamps: true,
    },
    logging: console[logging || ''],
}

const sequelize = env.isProduction
    ? new Sequelize(databaseUrl || '', options)
    : new Sequelize({ ...db, ...options } as SequelizeOptions)

sequelize.sync()

export { sequelize }
