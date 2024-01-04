import { AuthUser } from '@/@types/auth.type'
import { CreateOrderBody } from '@/@types/request.type'
import Order, { OrderState } from '@/models/schemas/Order.schema'
import { databaseService } from '@/services/database.service'
import { ObjectId } from 'mongodb'
import { ParsedUrlQuery } from 'querystring'

class OrderService {
  async getAllOrderByUser(query: ParsedUrlQuery) {
    const state = query.state as OrderState | undefined
    const userId = query.user_id as string

    if (state) {
      return await databaseService.orders.find({ state: state, user_id: new ObjectId(userId) }).toArray()
    }
    return await databaseService.orders.find({ user_id: new ObjectId(userId) }).toArray()
  }

  async updateOrder(id: string, state: OrderState) {
    return await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          state: state
        }
      },
      { upsert: false }
    )
  }
  async createOrder(user: AuthUser, payload: CreateOrderBody) {
    const orders = payload.orders.map(
      ({ amount, product_id }) =>
        new Order({
          amount,
          product_id: new ObjectId(product_id),
          user_id: new ObjectId(user._id),
          state: 'pending'
        })
    )

    return await databaseService.orders.insertMany(orders)
  }
}

const orderService = new OrderService()

export default orderService
