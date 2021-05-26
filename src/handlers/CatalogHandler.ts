import { sendUnaryData, ServerUnaryCall } from 'grpc'
import {
  Empty,
  Catalog,
  Product,
} from '../proto/catalog/catalog_pb'
import { CatalogServiceService as ProtoAuthService, ICatalogServiceServer } from '../proto/catalog/catalog_grpc_pb'
import products from '../../resources/db.json'

export class CatalogHandler implements ICatalogServiceServer {

  getCatalog(call: ServerUnaryCall<Empty>, callback: sendUnaryData<Catalog>): void {
    const response = new Catalog()
    products.map(product => {
      const newProduct = new Product()
      newProduct.setPrice(product.productPrice.toString())
      newProduct.setLabel(product.productName)
      newProduct.setDescription(product.productCategory)
      return newProduct
    })
      .map(response.addProduct)
    callback(null, response)
  }
}

export const service = ProtoAuthService
export const handler = new CatalogHandler()
export default {
  service: ProtoAuthService,
  handler: new CatalogHandler(),
}
