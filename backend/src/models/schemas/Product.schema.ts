import { ObjectId } from 'mongodb'
import ProductType from '~/models/schemas/ProductType.schema'

interface ProductT {
  _id?: ObjectId
  price: number
  name: string
  productType: ProductType
  tags: string[]
  description: string
  created_at?: Date
  updated_at?: Date
}

export default class Product {
  _id?: ObjectId
  price: number
  name: string
  productType: ProductType
  tags: string[]
  description: string
  created_at?: Date
  updated_at?: Date

  constructor(product: ProductT) {
    this._id = product._id
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.tags = product.tags
    this.productType = product.productType
    this.created_at = product.created_at || new Date()
    this.updated_at = product.updated_at || null
  }
}
