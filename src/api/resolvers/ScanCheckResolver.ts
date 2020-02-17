import { Arg, Mutation, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Check, CheckParam } from '../models'
import { ScanCheckService } from '../services'
import { CheckInput } from '../types'

@Service()
@Resolver(of => Check)
export class ScanCheckResolver {
  constructor(
    private scanCheckService: ScanCheckService,
  ) {
  }

  @Mutation(() => Boolean)
  public async createCheck(@Arg('checkInput') checkInput: CheckInput): Promise<boolean> {
    const checkParam = new CheckParam()
    checkParam.t = checkInput.t
    checkParam.s = checkInput.s.replace(/[,.]/i, '')
    checkParam.fn = checkInput.fn
    checkParam.i = checkInput.i
    checkParam.fp = checkInput.fp
    checkParam.n = checkInput.n

    await this.scanCheckService.create(checkParam)

    return true
  }
}
