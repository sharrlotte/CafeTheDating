import { VALIDATION_MESSAGES } from '@/constants/message'
import { checkSchema } from 'express-validator'
import validate from '@/utils/validate'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { databaseService } from '@/services/database.service'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'

export const refreshTokenValidator = validate(
  checkSchema(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!value) {
              throw new ErrorWithStatus({
                statusCode: StatusCodes.UNAUTHORIZED,
                message: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_IS_REQUIRED
              })
            }

            try {
              const result = await databaseService.refreshTokens.findOne({ token: value })
              if (!result) {
                throw new ErrorWithStatus({
                  message: VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_IS_NOT_EXIST,
                  statusCode: StatusCodes.UNAUTHORIZED
                })
              }
            } catch (error) {
              if (error instanceof JsonWebTokenError) {
                throw new ErrorWithStatus({
                  message: capitalize(error.message),
                  statusCode: StatusCodes.UNAUTHORIZED
                })
              }
              throw error
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)

export const getAllUserValidator = validate(
  checkSchema(
    {
      query: {
        trim: true,
        isString: {
          errorMessage: VALIDATION_MESSAGES.USER.COMMONS.USERNAME_MUST_BE_STRING
        }
      }
    },
    ['query']
  )
)
