import { Request } from 'express'
import { ProductTag } from '~/models/schemas/Product.schema'
import ProductType from '~/models/schemas/ProductType.schema'
import User from '~/models/schemas/Users.schema'

export interface RequestType extends Request {
  user: User
}

export type CreateProductBody = {
  name: string
  description: string
  price: number
  tags: ProductTag[]
  product_type: ProductType
  image: string
}

export type UpdateProductBody = CreateProductBody

export type CreateStarBody = {
  user_id: string
  product_id: string
}

export type ProductSort = 'discount' | 'best-choice' | 'new'
