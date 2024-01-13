import { UserRole } from '@/constants/enums'
import orderController from '@/controllers/order.controller'
import { requireLoginMiddleware, requireRoleMiddleware } from '@/middlewares/auth.middlewares'
import { objectIdValidator, paginationValidator } from '@/middlewares/commons.middleware'
import { createOrderValidator } from '@/middlewares/order.middlewares'
import { wrapRequestHandler } from '@/utils/handler'
import { Router } from 'express'

const orderRouter = Router()

orderRouter.get('/', requireRoleMiddleware(UserRole.Admin), paginationValidator, wrapRequestHandler(orderController.getAllOrder))

orderRouter.post('/', requireLoginMiddleware, createOrderValidator, wrapRequestHandler(orderController.createOrder))

orderRouter.put('/:id', requireRoleMiddleware(UserRole.Admin), objectIdValidator, wrapRequestHandler(orderController.updateOrder))

orderRouter.put('/:id/cancel', requireLoginMiddleware, objectIdValidator, wrapRequestHandler(orderController.cancelOrder))

export default orderRouter
