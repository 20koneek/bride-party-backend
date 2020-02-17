import { Service } from 'typedi'

import { Logger, LoggerInterface } from '../../decorators/Logger'
import { Check } from '../models'
import { PageParam } from '../../types/global'

@Service()
export class CheckService {

  constructor(
    @Logger(__filename) private log: LoggerInterface,
  ) {
  }

  public async all({ page, perPage }: PageParam): Promise<[Check[], number]> {
    return await Check.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: page * perPage,
      take: perPage,
    })
  }

  public find(id: string): Promise<Check | undefined> {
    this.log.info('Find check by id')
    return Check.findOne(id)
  }

  public create(check: Check): Promise<Check> {
    this.log.info(`Create a new check: ${Object.keys(check)}`)

    return Check.save(check)
  }

  public update(check: Check): Promise<Check> {
    this.log.info(`Update a check: ${Object.keys(check)}`)

    return Check.save(check)
  }
}
