import { AuthUser } from '@/@types/auth.type'
import { CreateOrderBody } from '@/@types/request.type'
import Order, { OrderState } from '@/models/schemas/Order.schema'
import { databaseService } from '@/services/database.service'
import { ObjectId } from 'mongodb'
import { ParsedUrlQuery } from 'querystring'

class OrderService {
  async getAllOrderByUser(query: ParsedUrlQuery, userId: string) {
    const state = query.state as (OrderState & 'all') | undefined

    let orders: Order[]

    if (state && state !== 'all') {
      orders = await databaseService.orders.find({ state: state, user_id: new ObjectId(userId) }).toArray()
    } else {
      orders = await databaseService.orders.find({ user_id: new ObjectId(userId) }).toArray()
    }

    const items = orders.map(async (item) => {
      const product = await databaseService.products.findOne({ _id: new ObjectId(item.product_id) })

      if (!product) {
        throw new Error('Order product not found')
      }

      item.product_name = product.name
      return item
    })

    return Promise.all(items)
  }

  async updateOrder(id: string, state: OrderState) {
    return await databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          state: state,
          updated_at: new Date()
        }
      },
      { upsert: false }
    )
  }
  async createOrder(user: AuthUser, payload: CreateOrderBody) {
    console.log(payload)
    const orders = payload.orders.map(async ({ amount, product_id }) => {
      const { price, discount } = await databaseService.products.findOne({ _id: new ObjectId(product_id) })

      return new Order({
        address: payload.address,
        price,
        discount,
        amount,
        product_id: new ObjectId(product_id),
        user_id: new ObjectId(user._id),
        state: 'pending'
      })
    })

    return await databaseService.orders.insertMany(await Promise.all(orders))
  }
}

const orderService = new OrderService()

export default orderService
