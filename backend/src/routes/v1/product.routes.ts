import { Router } from 'express'
import { UserRole } from '@/constants/enums'
import productController from '@/controllers/product.controllers'
import { requireRoleMiddleware } from '@/middlewares/auth.middlewares'
import { objectIdValidator } from '@/middlewares/commons.middleware'
import { createProductValidator, getAllProductValidator, updateProductValidator } from '@/middlewares/product.middlewares'
import { wrapRequestHandler } from '@/utils/handler'
import multerMiddleware from '@/middlewares/uploadFile.middleware'

const productRouter = Router()

productRouter.get('/', getAllProductValidator, wrapRequestHandler(productController.getAllProduct))

productRouter.post('/', multerMiddleware.single('image'), requireRoleMiddleware(UserRole.Admin), createProductValidator, wrapRequestHandler(productController.createProduct))

productRouter.put('/:id', multerMiddleware.single('image'), requireRoleMiddleware(UserRole.Admin), objectIdValidator, updateProductValidator, wrapRequestHandler(productController.updateProduct))

productRouter.delete('/:id', requireRoleMiddleware(UserRole.Admin), objectIdValidator, wrapRequestHandler(productController.deleteProduct))

export default productRouter
