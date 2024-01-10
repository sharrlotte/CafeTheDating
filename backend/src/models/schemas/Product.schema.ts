import { ObjectId } from 'mongodb'
import ProductType from '@/models/schemas/ProductType.schema'

interface ProductT {
  _id?: ObjectId
  price: number
  name: string
  product_type: ProductType
  tags: ProductTag[]
  image: string
  discount?: number
  description: string
  created_at?: Date
  updated_at?: Date
}
export const productSorts = ['discount', 'best-choice', 'new']
export type ProductSort = (typeof productSorts)[number]
export type ProductTag = 'best-choice' | 'new'

export default class Product {
  _id?: ObjectId
  price: number
  name: string
  product_type: ProductType
  tags: ProductTag[]
  image: string
  description: string
  discount: number
  created_at?: Date
  updated_at?: Date
  deleted: boolean = false

  constructor(product: ProductT) {
    this._id = product._id
    this.name = product.name
    this.description = product.description
    this.discount = product.discount || 0
    this.price = product.price
    this.tags = product.tags
    this.product_type = product.product_type
    this.created_at = product.created_at || new Date()
    this.updated_at = product.updated_at || null
    this.image = product.image
  }
}
