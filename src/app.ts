import 'reflect-metadata'
import { bootstrapMicroframework } from 'microframework-w3tec'

import { banner } from './lib/banner'
import { Logger } from './lib/logger'
import { eventDispatchLoader } from './loaders/eventDispatchLoader'
import { expressLoader } from './loaders/expressLoader'
import { homeLoader } from './loaders/homeLoader'
import { iocLoader } from './loaders/iocLoader'
import { publicLoader } from './loaders/publicLoader'
import { winstonLoader } from './loaders/winstonLoader'
import { firebaseLoader } from './loaders/firebaseLoader'
import { theMapLoader } from './loaders/theMapLoader'
import { adminGraphqlLoader } from './loaders/adminGraphqlLoader'
import { guestGraphqlLoader } from './loaders/guestGraphqlLoader'

const log = new Logger(__filename)

bootstrapMicroframework({
    loaders: [
        winstonLoader,
        iocLoader,
        eventDispatchLoader,
        firebaseLoader,
        theMapLoader,
        expressLoader,
        homeLoader,
        publicLoader,
        guestGraphqlLoader,
        adminGraphqlLoader,
    ],
})
    .then(() => banner(log))
    .catch(error => log.error('Application is crashed: ' + error))
