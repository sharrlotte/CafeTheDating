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
  productType: ProductType
  image: string
}

export type UpdateProductBody = CreateProductBody
