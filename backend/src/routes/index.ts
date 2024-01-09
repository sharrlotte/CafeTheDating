import { Router } from 'express'
import userRouter from './v1/users.routes'
import authRouter from './v1/auth.routes'
import productRouter from '@/routes/v1/product.routes'
import orderRouter from '@/routes/v1/order.routes'

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/auth', authRouter)
rootRouter.use('/products', productRouter)
rootRouter.use('/orders', orderRouter)

rootRouter.get('/health', (req, res) => {
  res.status(200).send('Healthy')
})

export default rootRouter
