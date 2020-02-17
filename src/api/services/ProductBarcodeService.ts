import { Service } from 'typedi'
import { Product, ProductBarcode } from '../models'
import { PageParam } from '../../types/global'
import { UpdateResult } from 'typeorm'

@Service()
export class ProductBarcodeService {

  public async all({ page, perPage }: PageParam): Promise<[ProductBarcode[], number]> {
    return await ProductBarcode.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: page * perPage,
      take: perPage,
    })
  }

  public find(barcode: string): Promise<ProductBarcode | undefined> {
    return ProductBarcode.findOne({ barcode })
  }

  public async createProduct(id: string): Promise<Product | undefined> {
    const productBarcode = await ProductBarcode.findOne(id)

    if (!productBarcode) {
      return undefined
    }

    if (productBarcode.product) {
      return productBarcode.product
    }

    const product = new Product()
    product.name = productBarcode.name
    product.netWeight = 1
    product.productBarcode = productBarcode
    return await product.save()
  }

  public increment(barcode: string): Promise<UpdateResult> {
    return ProductBarcode.update(
      { barcode },
      { queryCount: () => 'query_count + 1' },
    )
  }

  public create(barcode: ProductBarcode): Promise<ProductBarcode> {
    return ProductBarcode.save(barcode)
  }
}
