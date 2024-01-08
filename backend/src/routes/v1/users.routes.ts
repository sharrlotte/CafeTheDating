import { Router } from 'express'
import { UserRole } from '@/constants/enums'
import userController from '@/controllers/users.controllers'
import { requireLoginMiddleware, requireRoleMiddleware } from '@/middlewares/auth.middlewares'
import { paginationValidator } from '@/middlewares/commons.middleware'
import { getAllUserValidator, refreshTokenValidator } from '@/middlewares/users.middlewares'
import { wrapRequestHandler } from '@/utils/handler'

const userRouter = Router()

/**
 * Description. Refresh Token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(userController.refreshToken))

/**
 * Description: Get all user by admin
 * Path: '/'
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 * Params: { pageIndex: number, pageSize: number, query: string }
 */

userRouter.get('/', requireRoleMiddleware(UserRole.Admin), paginationValidator, getAllUserValidator, wrapRequestHandler(userController.getAllUser))

/**
 * Description: Get my profile
 * Path: /@me/profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

userRouter.get('/@me/profile', requireLoginMiddleware, wrapRequestHandler(userController.getMe))

export default userRouter
