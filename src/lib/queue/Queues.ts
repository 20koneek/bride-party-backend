import Queue from 'bull'

import { CheckParam } from '../../api/models'
import { env } from '../../env'
import { FnsQuery } from '../fns'
import { checkMappingQueue} from './checkMappingQueue'
import { CheckMappingQueueName, FnsCheckQueueName, FnsGetQueueName } from './QueueNames'

const FnsCheckQueue = new Queue<CheckParam>(FnsCheckQueueName, {
  redis: env.redis,
})

const FnsGetQueue = new Queue<CheckParam>(FnsGetQueueName, {
  redis: env.redis,
})

const CheckMappingQueue = new Queue<{ id: string }>(CheckMappingQueueName, {
  redis: env.redis,
})

FnsCheckQueue.process(async ({ data, progress }, done) => {
  try {
    if (await FnsQuery.fetchCheckParam(data)) {
      FnsGetQueue.add(data, { delay: 10_000 })
      done()
    } else {
      done(new Error('error transcoding'))
    }
  } catch (e) {
    done(new Error(e))
  }
})

FnsGetQueue.process(async ({ data, progress }, done) => {
  try {
    const check = await FnsQuery.getScanCheck(data)

    if (check) {
      CheckMappingQueue.add({ id: check.id })
    }

    done()
  } catch (e) {
    console.log(e)
    done(new Error(e))
  }
})

CheckMappingQueue.process(async ({ data, progress }, done) => {
  try {
    await checkMappingQueue(data.id)
    done()
  } catch (e) {
    console.log(e)
    done(new Error(e))
  }
})

export {
  FnsGetQueue,
  FnsCheckQueue,
  CheckMappingQueue,
}
