import { UserRole } from '@/constants/enums'
import orderController from '@/controllers/order.controller'
import { requireLoginMiddleware, requireRoleMiddleware } from '@/middlewares/auth.middlewares'
import { wrapRequestHandler } from '@/utils/handler'
import { Router } from 'express'

const orderRouter = Router()

orderRouter.get('/', requireLoginMiddleware, wrapRequestHandler(orderController.getAllOrderByUser))

orderRouter.post('/', requireLoginMiddleware, wrapRequestHandler(orderController.createOrder))

orderRouter.put('/:id', requireRoleMiddleware(UserRole.Admin), wrapRequestHandler(orderController.updateOrder))

orderRouter.put('/:id/cancel', requireLoginMiddleware, wrapRequestHandler(orderController.cancelOrder))

export default orderRouter
