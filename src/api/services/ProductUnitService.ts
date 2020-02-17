import { Service } from 'typedi'
import { IsNull } from 'typeorm'

import { ProductUnit } from '../models'
import { ProductUnitInput } from '../types/input'

@Service()
export class ProductUnitService {

  public all = (id: string | undefined): Promise<ProductUnit[]> => (
    ProductUnit.find({
      where: { parentProductUnitId: id ?? IsNull() },
    })
  )

  public find = (id: string): Promise<ProductUnit | undefined> => (
    ProductUnit.findOne(id)
  )

  public create = (productUnit: ProductUnitInput): Promise<ProductUnit> => {
    const newProductUnit = new ProductUnit()
    newProductUnit.name = productUnit.name
    newProductUnit.parentProductUnitId = productUnit.parentProductUnitId

    return newProductUnit.save()
  }

  public update = async (id: string, input: ProductUnitInput): Promise<ProductUnit> => {
    const productUnit = await this.find(id)

    if (!productUnit) {
      throw new Error('product not found')
    }

    productUnit.name = input.name
    productUnit.parentProductUnitId = input.parentProductUnitId

    return productUnit.save()
  }
}
