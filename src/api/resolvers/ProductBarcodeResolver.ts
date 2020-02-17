import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { Product, ProductBarcode, ProductBarcodePaginate } from '../types'
import { ProductBarcode as ProductBarcodeModel } from '../models'
import { ProductBarcodeService } from '../services'
import { BarcodeQuery } from '../../lib/barcode'
import { PageInfo } from '../types/PageInfo'

@Service()
@Resolver(() => Product)
export class ProductBarcodeResolver {

  constructor(
    private service: ProductBarcodeService,
  ) {
  }

  @Query(() => ProductBarcodePaginate)
  public async productsBarcodePaginate(
    @Arg('page', () => Int) page: number,
    @Arg('perPage', () => Int) perPage: number,
  ): Promise<ProductBarcodePaginate> {
    const [productsBarcode, totalCount] = await this.service.all({ page, perPage })
    const pageInfo: PageInfo = {
      page,
      perPage,
      totalCount,
    }
    return {
      productsBarcode,
      pageInfo,
    }
  }

  @Query(() => ProductBarcode, { nullable: true })
  // @UseMiddleware(CurrentUserMiddleware)
  public productBarcode(@Arg('id') id: string): Promise<ProductBarcode | undefined> {
    return this.service.find(id)
  }

  @Mutation(() => Product, { nullable: true })
  public async productByBarcode(@Arg('barcode') barcode: string): Promise<Product | undefined> {
    let barcodeProduct = await this.service.find(barcode)

    if (!barcodeProduct) {
      const query = await BarcodeQuery()
      const name = await query(barcode)

      const barcodeModel = new ProductBarcodeModel()
      barcodeModel.barcode = barcode
      barcodeModel.name = name ?? 'Не найдено'
      barcodeProduct = await this.service.create(barcodeModel)
    } else {
      await this.service.increment(barcode)
    }

    return barcodeProduct?.product
  }

  @Mutation(() => Product, { nullable: true })
  public async createProductByBarcode(@Arg('id') id: string): Promise<Product | undefined> {
    return await this.service.createProduct(id)
  }
}
