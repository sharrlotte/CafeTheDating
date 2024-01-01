import { ObjectId } from 'mongodb'
import ProductType from '~/models/schemas/ProductType.schema'

interface ProductT {
  _id?: ObjectId
  price: number
  name: string
  productType: ProductType
  tags: string[]
  
  discount?: number
  description: string
  created_at?: Date
  updated_at?: Date
  image: string
}

export default class Product {
  _id?: ObjectId
  price: number
  name: string
  productType: ProductType
  tags: string[]
  description: string
  discount?: number
  created_at?: Date
  updated_at?: Date
  image: string

  constructor(product: ProductT) {
    this._id = product._id
    this.name = product.name
    this.description = product.description
    this.discount = product.discount || 0
    this.price = product.price
    this.tags = product.tags
    this.productType = product.productType
    this.created_at = product.created_at || new Date()
    this.updated_at = product.updated_at || null
    this.image = product.image
  }
}
