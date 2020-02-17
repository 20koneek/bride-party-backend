import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Product as ProductModel } from '../models'
import { ProductService } from '../services'
import { Product, ProductInput } from '../types'

@Service()
@Resolver(() => Product)
export class ProductResolver {

  constructor(
    private service: ProductService,
  ) {
  }

  @Query(() => [Product])
  // @UseMiddleware(CurrentUserMiddleware)
  public products(): Promise<Product[]> {
    return this.service.all()
  }

  @Query(() => Product, { nullable: true })
  // @UseMiddleware(CurrentUserMiddleware)
  public product(@Arg('id') id: string): Promise<Product | undefined> {
    return this.service.find(id)
  }

  @Mutation(() => Product)
  public async createProduct(
    @Arg('input') productInput: ProductInput,
  ): Promise<Product> {
    const newProduct = new ProductModel()
    newProduct.name = productInput.name

    return await this.service.create(newProduct)
  }

  @Mutation(() => Product)
  public async updateProduct(
    @Arg('id') id: string,
    @Arg('input') productInput: ProductInput,
  ): Promise<Product> {
    const product = await this.service.find(id)

    if (!product) {
      throw { message: 'product not found' }
    }

    product.name = productInput.name
    product.netWeight = productInput.netWeight

    return await this.service.update(product)
  }
}
