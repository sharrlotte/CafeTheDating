import { ObjectId } from 'mongodb'
import ProductType from '~/models/schemas/ProductType.schema'

interface ProductT {
  _id?: ObjectId
  price: number
  name: string
  product_type: ProductType
  tags: string[]
  description: string
  created_at?: Date
  updated_at?: Date
  image: string
}

export default class Product {
  _id?: ObjectId
  price: number
  name: string
  product_type: ProductType
  tags: string[]
  description: string
  created_at?: Date
  updated_at?: Date
  image: string

  constructor(product: ProductT) {
    this._id = product._id
    this.name = product.name
    this.description = product.description
    this.price = product.price
    this.tags = product.tags
    this.product_type = product.product_type
    this.created_at = product.created_at || new Date()
    this.updated_at = product.updated_at || null
    this.image = product.image
  }
}
