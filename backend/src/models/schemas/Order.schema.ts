import { ObjectId } from 'mongodb'

export const orderStates = ['pending', 'accept', 'shipping', 'completed', 'canceled', 'refused'] as const

export type OrderState = (typeof orderStates)[number]

interface OrderType {
  _id?: ObjectId
  product_id: ObjectId
  user_id: ObjectId
  amount: number
  state: OrderState
  created_at?: Date
  updated_at?: Date
}

export default class Order {
  _id?: ObjectId
  product_id: ObjectId
  user_id: ObjectId
  amount: number
  state: OrderState
  created_at?: Date
  updated_at?: Date

  constructor(order: OrderType) {
    this._id = order._id
    this.amount = order.amount
    this.product_id = order.product_id
    this.state = order.state || 'pending'
    this.user_id = order.user_id
    this.created_at = order.created_at || new Date()
    this.updated_at = order.updated_at || null
  }
}
