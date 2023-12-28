import { Router } from 'express'
import starController from '~/controllers/star.controller'
import { requireLoginMiddleware } from '~/middlewares/auth.middlewares'
import { createStarValidator } from '~/middlewares/star.middlewares'
import { wrapRequestHandler } from '~/utils/handler'

const startRouter = Router()

startRouter.post('/', wrapRequestHandler(requireLoginMiddleware), createStarValidator, wrapRequestHandler(starController.createStar))

export default startRouter
