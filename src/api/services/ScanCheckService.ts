import { Service } from 'typedi'
import { FnsCheckQueue } from '../../lib/queue'
import { Check, CheckParam } from '../models'
import moment from 'moment'

@Service()
export class ScanCheckService {

  public async create(checkParam: CheckParam): Promise<CheckParam> {
    const check = new Check()
    check.totalSum = Number(checkParam.s)
    check.dateTime = moment()
    await check.save()

    checkParam.checkId = check.id
    await checkParam.save()

    FnsCheckQueue.add(checkParam)

    return checkParam
  }
}
