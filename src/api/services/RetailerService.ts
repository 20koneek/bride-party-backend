import { Service } from 'typedi'
import { Logger, LoggerInterface } from '../../decorators/Logger'
import { Retailer } from '../models'

@Service()
export class RetailerService {

  constructor(
    @Logger(__filename) private log: LoggerInterface,
  ) {
  }

  public all(): Promise<Retailer[]> {
    this.log.info('Find all retailers')
    return Retailer.find({
      order: {
        createdAt: 'DESC',
      },
    })
  }

  public find(id: string): Promise<Retailer | undefined> {
    this.log.info('Find retailer by id')
    return Retailer.findOne(id)
  }
}
