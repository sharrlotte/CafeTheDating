import { Request, Response, NextFunction } from 'express'
import { sendResponse } from '~/config/response.config'
import { ParamsDictionary } from 'express-serve-static-core'
import { RefreshTokenBody } from '~/models/requests/User.requests'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/message'
import userServices from '~/services/users.service'
import { ParsedUrlQuery } from 'querystring'
import { ObjectId } from 'mongodb'

const userController = {
  refreshToken: async (req: Request<ParamsDictionary, any, RefreshTokenBody>, res: Response, next: NextFunction) => {
    const result = await userServices.refreshToken(req.body)

    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.REFRESH_TOKEN)
  },
  getAllUser: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await userServices.getAllUser(req.query)
    // Message register successfully!
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_ALL_USER)
  },
  getUser: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.params.id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_USER)
  },
  getMe: async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const result = await userServices.getUserByID(new ObjectId(req.user._id))
    return sendResponse.success(res, result, RESULT_RESPONSE_MESSAGES.USER_SUCCESS.GET_USER)
  }
}

export default userController
