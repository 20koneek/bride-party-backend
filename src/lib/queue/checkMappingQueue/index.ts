import { differenceWith, uniq } from 'lodash'
import { Check, Product, ProductCheckInfo, ProductMapping, ProductUnit } from '../../../api/models'
import { ICheckMappingQueue } from './interfaces'

export const checkMappingQueue: ICheckMappingQueue = async (uuid) => {
  const check = await Check.findOne(uuid)
  if (!check) {
    return
  }
  const { checkProducts } = check

  const productNames = uniq(checkProducts.map(({ name }) => name))
  let productMappings = await ProductMapping.find({
    where: `name in ('${productNames.join('\', \'')}') and retailer_id ='${check.retailerId}'`,
  })

  if (productMappings.length !== productNames.length) {
    const newNames = differenceWith(productNames, productMappings.map(({ name }) => name))

    let productUnit = await ProductUnit.findOne({ name: 'Default' })

    if (!productUnit) {
      const newProductUnit = new ProductUnit()
      newProductUnit.name = 'Default'
      productUnit = await newProductUnit.save()
    }

    const newProducts = await Product.save(newNames.map((name) => {
      const newProduct = new Product()
      newProduct.name = name
      newProduct.productUnitId = productUnit!.id

      return newProduct
    }))

    const newProductMappings = await ProductMapping.save(newProducts.map(({ id, name }) => {
      const newProductMapping = new ProductMapping()
      newProductMapping.name = name
      newProductMapping.productId = id
      if (check.retailerId) {
        newProductMapping.retailerId = check.retailerId
      }
      return newProductMapping
    }))

    productMappings = [...productMappings, ...newProductMappings]
  }

  await ProductCheckInfo.save(productMappings.map(({ id, productId, name }) => {
    const checkItem = checkProducts.find((item) => name === item.name)

    const newProductCheckInfo = new ProductCheckInfo()
    newProductCheckInfo.productMappingId = id
    newProductCheckInfo.productId = productId

    if (!checkItem) {
      return newProductCheckInfo
    }

    newProductCheckInfo.checkProductId = checkItem.id
    newProductCheckInfo.price = checkItem.price
    newProductCheckInfo.grossPrice = checkItem.price

    return newProductCheckInfo
  }))
}
