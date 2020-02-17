import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Context } from '../../types/Context'
import { Retailer } from '../types'
import { RetailerService } from '../services'

@Service()
@Resolver(of => Retailer)
export class RetailerResolver {
  constructor(
    private retailerService: RetailerService,
  ) {
  }

  @Query(() => [Retailer])
  // @UseMiddleware(CurrentUserMiddleware)
  public retailers(@Ctx() { token }: Context): Promise<Retailer[]> {
    return this.retailerService.all()
  }

  @Query(() => Retailer, { nullable: true })
  // @UseMiddleware(CurrentUserMiddleware)
  public retailer(@Arg('id') id: string): Promise<Retailer | undefined> {
    return this.retailerService.find(id)
  }
}
