import { ProductTag } from '@/models/schemas/Product.schema'
import ProductType from '@/models/schemas/ProductType.schema'
import { OrderState } from '@/models/schemas/Order.schema'

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

export type UpdateOrderBody = {
  state: OrderState
}

export type CreateOrderBody = {
  orders: Array<{
    product_id: string
    amount: number
    size: string
  }>
  address: string
}
