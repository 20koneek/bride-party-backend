import { env } from '../env'
import { Logger } from './logger'

export function banner(log: Logger): void {
    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`
        log.info(``)
        log.info(`Aloha, your app is ready on ${route()}`)
        log.info(`To shut it down, press <CTRL> + C at any time.`)
        log.info(``)
        log.info('-------------------------------------------------------')
        log.info(`Environment  : ${env.node}`)
        log.info(`Version      : ${env.app.version}`)
        log.info(``)

        if (env.graphql.enabled) {
            log.info(`AdminGraphQL : ${route()}${env.graphql.adminRoute}`)
            log.info(`GuestGraphQL : ${route()}${env.graphql.guestRoute}`)
        }

        log.info('-------------------------------------------------------')
        log.info('')
    } else {
        log.info(`Application is up and running.`)
    }
}
