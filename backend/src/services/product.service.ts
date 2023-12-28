import { ObjectId } from 'mongodb'
import { ParsedUrlQuery } from 'querystring'
import { CreateProductBody, UpdateProductBody } from '~/@types/request.type'
import Product from '~/models/schemas/Product.schema'
import ProductType from '~/models/schemas/ProductType.schema'
import { databaseService } from '~/services/database.service'

class ProductService {
  async getAllProduct(query: ParsedUrlQuery) {
    const product_type: ProductType = query.type as ProductType
    return await databaseService.products.find({ product_type: product_type }).toArray()
  }

  async createProduct(payload: CreateProductBody) {
    await databaseService.products.insertOne(new Product(payload))
  }
  async updateProduct(id: string, payload: UpdateProductBody) {
    await databaseService.products.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: payload
      },
      {
        upsert: false
      }
    )
  }
  async deleteProduct(id: string) {
    await databaseService.products.deleteOne({ _id: new ObjectId(id) })
  }
}

const productService = new ProductService()
export default productService
