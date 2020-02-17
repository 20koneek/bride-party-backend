import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { ProductUnitService } from '../services'
import { ProductUnit, ProductUnitInput } from '../types'

@Service()
@Resolver(() => ProductUnit)
export class ProductUnitResolver {

  constructor(
    private service: ProductUnitService,
  ) {
  }

  @Query(() => [ProductUnit])
  public productUnits(
    @Arg('id', { nullable: true }) id?: string,
  ): Promise<ProductUnit[]> {
    return this.service.all(id)
  }

  @Query(() => ProductUnit, { nullable: true })
  public productUnit(
    @Arg('id') id: string,
  ): Promise<ProductUnit | undefined> {
    return this.service.find(id)
  }

  @Mutation(() => ProductUnit)
  public createProductUnit(
    @Arg('input') input: ProductUnitInput,
  ): Promise<ProductUnit> {
    return this.service.create(input)
  }

  @Mutation(() => ProductUnit)
  public updateProductUnit(
    @Arg('id') id: string,
    @Arg('input') input: ProductUnitInput,
  ): Promise<ProductUnit> {
    return this.service.update(id, input)
  }
}
