import { Request } from 'express'
import ProductType from '~/models/schemas/ProductType.schema'
import User from '~/models/schemas/Users.schema'

export interface RequestType extends Request {
  user: User
}

export type CreateProductBody = {
  name: string
  description: string
  price: number
  tags: string[]
  product_type: ProductType
  productType: ProductType
  image: string
}

export type UpdateProductBody = CreateProductBody

export type CreateStarBody = {
  user_id: string
  product_id: string
}
