import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedUrlQuery } from 'querystring'
import orderService from '@/services/order.service'
import { CreateOrderBody, UpdateOrderBody } from '@/@types/request.type'
import { StatusCodes } from 'http-status-codes'

const orderController = {
  getAllOrderByUser: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.getAllOrderByUser(req.query)
    return res.status(StatusCodes.OK).json(result)
  },

  createOrder: async (req: Request<ParamsDictionary, any, CreateOrderBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.createOrder(req.user, req.body)
    return res.status(StatusCodes.OK).json(result)
  },

  updateOrder: async (req: Request<ParamsDictionary, any, UpdateOrderBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.updateOrder(req.params.id, req.body.state)
    return res.status(StatusCodes.OK).json(result)
  },
  cancelOrder: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.updateOrder(req.params.id, 'canceled')
    return res.status(StatusCodes.OK).json(result)
  }
}

export default orderController
