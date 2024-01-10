import { ObjectId } from 'mongodb'

export const orderStates = ['pending', 'accept', 'shipping', 'completed', 'canceled', 'refused'] as const

export type OrderState = (typeof orderStates)[number]

interface OrderType {
  _id?: ObjectId
  user_id: ObjectId
  price: number
  discount: number
  product_id: ObjectId
  address: string
  product_name?: string
  amount: number
  state: OrderState
  created_at?: Date
  updated_at?: Date
}

export default class Order {
  _id: ObjectId
  price: number
  product_name: string
  discount: number
  product_id: ObjectId
  amount: number
  address: string
  user_id: ObjectId
  state: OrderState
  created_at?: Date
  updated_at?: Date

  constructor(order: OrderType) {
    this._id = order._id
    this.state = order.state || 'pending'
    this.price = order.price
    this.discount = order.discount
    this.product_id = order.product_id
    this.amount = order.amount
    this.address = order.address
    this.user_id = order.user_id
    this.created_at = order.created_at || new Date()
    this.updated_at = order.updated_at || null
  }
}
