import jwt from 'jsonwebtoken'
import { SignTokenType, VerifyTokenType } from '@/@types/tokenPayload.type'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'

export const signToken = ({ payload, privateKey, options }: SignTokenType): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(new ErrorWithStatus({ message: err.message, statusCode: StatusCodes.UNAUTHORIZED }))
      }
      resolve(token as string)
    })
  })
}

export const verifyToken = ({ token, secretOrPublicKey }: VerifyTokenType) => {
  return new Promise<jwt.JwtPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, function (err, decoded) {
      if (err) {
        reject(new ErrorWithStatus({ message: err.message, statusCode: StatusCodes.UNAUTHORIZED }))
      }
      resolve(decoded as jwt.JwtPayload)
    })
  })
}
