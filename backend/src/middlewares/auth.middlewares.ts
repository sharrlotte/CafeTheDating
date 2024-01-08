import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { env } from '@/config/environment.config'
import { UserRole } from '@/constants/enums'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { verifyToken } from '@/utils/jwt'
import { AuthUser } from '@/@types/auth.type'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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
  const user = (await verifyToken({
    token: access_token,
    secretOrPublicKey: env.jwt.secret_key
  })) as AuthUser

  req.user = user
  return next()
}

export const requireLoginMiddleware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authMiddleware(req, res, async () => {
        if (!req.user) {
          throw new ErrorWithStatus({
            statusCode: StatusCodes.UNAUTHORIZED,
            message: VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
          })
        }
        return next()
      })
    } catch (error) {
      next(error)
    }
  }
}

export const requireRoleMiddleware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authMiddleware(req, res, async () => {
        if (!req.user || !roles.includes(req.user.role)) {
          throw new ErrorWithStatus({
            statusCode: StatusCodes.UNAUTHORIZED,
            message: VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
          })
        }
        return next()
      })
    } catch (error) {
      next(error)
    }
  }
}
