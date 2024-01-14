import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RefreshTokenBody } from '@/models/requests/User.requests'
import userServices from '@/services/users.service'
import { ParsedUrlQuery } from 'querystring'
import { ObjectId } from 'mongodb'
import { StatusCodes } from 'http-status-codes'
import { UserRole } from '@/constants/enums'
import orderService from '@/services/order.service'

const userController = {
  refreshToken: async (req: Request<ParamsDictionary, any, RefreshTokenBody>, res: Response, next: NextFunction) => {
    const result = await userServices.refreshToken(req.body)

    return res.status(StatusCodes.OK).json(result)
  },
  getAllUser: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUser(req.query)

    return res.status(StatusCodes.OK).json(result)
  },
  getUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.params.id))
    return res.status(StatusCodes.OK).json(result)
  },
  getMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.user._id))
    return res.status(StatusCodes.OK).json(result)
  },

  changeRole: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.changeRole(req.params.id, req.body.role as UserRole)
    return res.status(StatusCodes.OK).json(result)
  },
  getMeAllOrder: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await orderService.getAllOrderByUser(req.query, req.user._id)
    return res.status(StatusCodes.OK).json(result)
  }
}

export default userController
