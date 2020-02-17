import { Field, ObjectType } from 'type-graphql'
import { PageInfo } from '../PageInfo'
import { ProductBarcode } from './ProductBarcode'

@ObjectType()
export class ProductBarcodePaginate {

  @Field(() => [ProductBarcode])
  public productsBarcode: ProductBarcode[]

  @Field(() => PageInfo)
  public pageInfo: PageInfo
}
