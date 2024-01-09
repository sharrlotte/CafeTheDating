import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { orderStates } from '@/models/schemas/Order.schema'
import validate from '@/utils/validate'
import { validateObjectId } from '@/middlewares/commons.middleware'
import { databaseService } from '@/services/database.service'
import { ObjectId } from 'mongodb'

export const getAllOrderValidator = validate(
  checkSchema(
    {
      state: {
        trim: true,
        isString: {
          errorMessage: 'Order type must be a string'
        },
        optional: true,
        custom: {
          options: (value) => {
            if (![orderStates].includes(value)) {
              throw new ErrorWithStatus({
                message: 'Invalid order state',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }
            return true
          }
        }
      }
    },
    ['query']
  )
)

export const adminUpdateOrder = validate(
  checkSchema(
    {
      state: {
        trim: true,
        isString: {
          errorMessage: 'Order type must be a string'
        },
        custom: {
          options: (value) => {
            if (!orderStates.includes(value)) {
              throw new ErrorWithStatus({
                message: 'Invalid order state',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }
            return true
          }
        }
      },
      id: {
        trim: true,
        isString: {
          errorMessage: 'Order id must be a string'
        },
        optional: true,
        custom: {
          options: (value) => {
            validateObjectId(value)
            return true
          }
        }
      }
    },
    ['params', 'body']
  )
)

export const createOrderValidator = validate(
  checkSchema(
    {
      address: {
        notEmpty: {
          errorMessage: 'Address is required'
        },
        isString: { errorMessage: 'Address must be a string' }
      },
      orders: {
        isArray: {
          errorMessage: 'Orders must be an array',
          options: {
            min: 1
          }
        },
        toArray: true
      },
      'orders.*.product_id': {
        trim: true,
        isString: true,
        custom: {
          options: async (value) => {
            console.log(value)
            validateObjectId(value)

            var product = await databaseService.products.findOne({ _id: new ObjectId(value) })

            if (!product) {
              throw new ErrorWithStatus({
                message: 'Product not found for id: ' + value,
                statusCode: StatusCodes.NOT_FOUND
              })
            }
            return true
          }
        }
      },
      'orders.*.amount': {
        isInt: {
          options: {
            min: 1
          },
          errorMessage: 'Invalid amount'
        }
      }
    },
    ['params', 'body']
  )
)

export const userCancelOrder = validate(
  checkSchema(
    {
      id: {
        trim: true,
        isString: {
          errorMessage: 'Sort must be a string'
        },
        optional: true,
        custom: {
          options: async (value, { req }) => {
            validateObjectId(value)

            const order = await databaseService.orders.findOne({ _id: value, user_id: new ObjectId(req.user._id) })

            if (!order) {
              throw new ErrorWithStatus({
                message: 'Order is not exist or not belong to you',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      }
    },
    ['params', 'body']
  )
)
