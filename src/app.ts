import 'reflect-metadata'
import { bootstrapMicroframework } from 'microframework-w3tec'

import { banner } from './lib/banner'
import { Logger } from './lib/logger'
import { eventDispatchLoader } from './loaders/eventDispatchLoader'
import { expressLoader } from './loaders/expressLoader'
import { graphqlLoader } from './loaders/graphqlLoader'
import { homeLoader } from './loaders/homeLoader'
import { iocLoader } from './loaders/iocLoader'
import { monitorLoader } from './loaders/monitorLoader'
import { publicLoader } from './loaders/publicLoader'
import { typeormLoader } from './loaders/typeormLoader'
import { winstonLoader } from './loaders/winstonLoader'
import { bullArenaLoader } from './loaders/bullArenaLoader'
import { firebaseLoader } from './loaders/firebaseLoader'

const log = new Logger(__filename)

bootstrapMicroframework({
  loaders: [
    winstonLoader,
    iocLoader,
    eventDispatchLoader,
    firebaseLoader,
    typeormLoader,
    expressLoader,
    monitorLoader,
    homeLoader,
    publicLoader,
    graphqlLoader,
    bullArenaLoader,
  ],
})
  .then(() => banner(log))
// .catch(error => log.error('Application is crashed: ' + error))
