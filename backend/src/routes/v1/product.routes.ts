import { Router } from 'express'
import { UserRole } from '~/constants/enums'
import productController from '~/controllers/product.controllers'
import { requireRoleMiddleware } from '~/middlewares/auth.middlewares'
import { objectIdValidator } from '~/middlewares/commons.middleware'
import { createProductValidator, getAllProductValidator } from '~/middlewares/product.middlewares'
import { singleImageUpload } from '~/middlewares/uploadFile.middleware'
import { wrapRequestHandler } from '~/utils/handler'

const productRouter = Router()

productRouter.get('/', getAllProductValidator, wrapRequestHandler(productController.getAllProduct))

productRouter.post('/:id/image', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), singleImageUpload, wrapRequestHandler(productController.uploadImage))

productRouter.post('/', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), createProductValidator, wrapRequestHandler(productController.createProduct))

productRouter.put('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), objectIdValidator, wrapRequestHandler(productController.updateProduct))

productRouter.delete('/:id', wrapRequestHandler(requireRoleMiddleware(UserRole.Admin)), objectIdValidator, wrapRequestHandler(productController.deleteProduct))

export default productRouter
