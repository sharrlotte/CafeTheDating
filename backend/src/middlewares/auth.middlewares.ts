import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { env } from '@/config/environment.config'
import { UserRole } from '@/constants/enums'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { verifyToken } from '@/utils/jwt'
import { AuthUser } from '@/@types/auth.type'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bearer = req.get('Authorization')
    if (!bearer) {
      return next()
    }

    const tokens = bearer.split(' ')
    if (tokens.length !== 2) {
      throw new ErrorWithStatus({
        message: VALIDATION_MESSAGES.TOKEN.INVALID_BEARER_TOKEN,
        statusCode: StatusCodes.UNAUTHORIZED
      })
    }

    const access_token = tokens[1]
    const user = await verifyToken({
      token: access_token,
      secretOrPublicKey: env.jwt.secret_key
    })

    req.user = user as AuthUser
    return next()
  } catch (error) {
    return next(error)
  }
}

export const requireLoginMiddleware = () => {
  return [
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user) {
          throw new ErrorWithStatus({
            statusCode: StatusCodes.UNAUTHORIZED,
            message: VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
          })
        }
        return next()
      } catch (error) {
        return next(error)
      }
    }
  ]
}

export const requireRoleMiddleware = (...roles: UserRole[]) => {
  return [
    authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.user || !roles.includes(req.user.role)) {
          throw new ErrorWithStatus({
            statusCode: StatusCodes.UNAUTHORIZED,
            message: VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
          })
        }
        return next()
      } catch (error) {
        return next(error)
      }
    }
  ]
}
