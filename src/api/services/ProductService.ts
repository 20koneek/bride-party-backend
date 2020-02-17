import { Service } from 'typedi'
import { Product } from '../models'

@Service()
export class ProductService {

  public all = (): Promise<Product[]> => (
    Product.find()
  )

  public find = (id: string): Promise<Product | undefined> => (
    Product.findOne(id)
  )

  public create = (product: Product): Promise<Product> => (
    Product.save(product)
  )

  public update = (product: Product): Promise<Product> => (
    Product.save(product)
  )
}
