import { Arg, Int, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { CheckService } from '../services'
import { Check, CheckPaginate } from '../types'
import { PageInfo } from '../types/PageInfo'

@Service()
@Resolver(of => Check)
export class CheckResolver {
  constructor(
    private service: CheckService,
  ) {
  }

  @Query(() => CheckPaginate)
  public async checksPaginate(
    @Arg('page', () => Int) page: number,
    @Arg('perPage', () => Int) perPage: number,
  ): Promise<CheckPaginate> {
    const [checks, totalCount] = await this.service.all({ page, perPage })
    const pageInfo: PageInfo = {
      page,
      perPage,
      totalCount,
    }
    return {
      checks,
      pageInfo,
    }
  }

  @Query(() => Check, { nullable: true })
  // @UseMiddleware(CurrentUserMiddleware)
  public check(@Arg('id') id: string): Promise<Check | undefined> {
    return this.service.find(id)
  }
}
