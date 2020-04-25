import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { env } from '../../env'

const options: SequelizeOptions = {
    ...env.db,
    dialect: 'postgres',
    define: {
        underscored: true,
        timestamps: true,
    },
}

const sequelize = new Sequelize(options)

sequelize.sync()

export { sequelize }
