import { Router } from 'express'
import userRouter from './v1/users.routes'
import authRouter from './v1/auth.routes'
import productRouter from '~/routes/v1/product.routes'
const rootRouter = Router()

rootRouter.use('/v1/users', userRouter)
rootRouter.use('/v1/auth', authRouter)
rootRouter.use('/v1/products', productRouter)

export default rootRouter
