import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { VALIDATION_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import { databaseService } from '~/services/database.service'
import validate from '~/utils/validate'

export const createStarValidator = validate(
  checkSchema(
    {
      productId: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (!ObjectId.isValid(value)) {
              throw new ErrorWithStatus({
                message: VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                statusCode: StatusCodes.NOT_FOUND
              })
            }

            const result = await databaseService.stars.findOne({
              user_id: req.user._id,
              product_id: value
            })

            if (Boolean(result)) {
              throw new ErrorWithStatus({
                message: 'You already start this product',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
