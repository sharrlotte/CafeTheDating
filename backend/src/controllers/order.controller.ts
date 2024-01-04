import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedUrlQuery } from 'querystring'
import orderService from '@/services/order.service'
import { CreateOrderBody, UpdateOrderBody } from '@/@types/request.type'

const orderController = {
  getAllOrderByUser: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.getAllOrderByUser(req.query)
    return result
  },

  createOrder: async (req: Request<ParamsDictionary, any, CreateOrderBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.createOrder(req.user, req.body)
    return result
  },

  updateOrder: async (req: Request<ParamsDictionary, any, UpdateOrderBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.updateOrder(req.params.id, req.body.state)
    return result
  },
  cancelOrder: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.updateOrder(req.params.id, 'canceled')
    return result
  }
}

export default orderController
