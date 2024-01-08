import { databaseService } from './database.service'
import { TokenType, UserRole } from '@/constants/enums'
import { env } from '@/config/environment.config'
import { RefreshTokenBody } from '@/models/requests/User.requests'
import RefreshToken from '@/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { PaginationType, ResultRefreshTokenType } from '@/@types/reponse.type'
import User from '@/models/schemas/Users.schema'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { StatusCodes } from 'http-status-codes'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { ParsedUrlQuery } from 'querystring'
import _ from 'lodash'
import { signToken } from '@/utils/jwt'
import { verifyToken } from '@/utils/jwt'

class UserService {
  async validateRefreshToken(refresh_token: string) {
    const token = await databaseService.refreshTokens.findOne({ token: refresh_token })
    return Boolean(token)
  }

  signAccessToken(_id: string, email: string, role: UserRole) {
    let { access_token_exp, jwt_algorithm, secret_key } = env.jwt
    return signToken({
      payload: {
        _id,
        email,
        role,
        token_type: TokenType.AccessToken
      },
      privateKey: secret_key as string,
      options: {
        expiresIn: access_token_exp,
        algorithm: jwt_algorithm
      }
    })
  }

  signRefreshToken(_id: string, email: string, role: UserRole) {
    let { refresh_token_exp, jwt_algorithm, refresh_token_key } = env.jwt
    return signToken({
      payload: {
        _id,
        email,
        role,
        token_type: TokenType.RefreshToken
      },
      privateKey: refresh_token_key as string,
      options: {
        expiresIn: refresh_token_exp,
        algorithm: jwt_algorithm
      }
    })
  }
  // Create access_token and refresh_token
  signAccessAndRefreshToken(user_id: string, email: string, role: UserRole) {
    return Promise.all([this.signAccessToken(user_id, email, role), this.signRefreshToken(user_id, email, role)])
  }

  async refreshToken(payload: RefreshTokenBody) {
    const { refresh_token } = payload
    const { refresh_token_key } = env.jwt

    const { _id, role, email } = await verifyToken({
      token: refresh_token,
      secretOrPublicKey: refresh_token_key
    })

    const deleteRefreshToken = databaseService.refreshTokens.deleteOne({ user_id: _id })
    const signToken = this.signAccessAndRefreshToken(_id, email, role)

    const [tokens] = await Promise.all([signToken, deleteRefreshToken])

    const [newAccessToken, newRefreshToken] = tokens

    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(_id)
      })
    )

    const result: ResultRefreshTokenType = { access_token: newAccessToken, refresh_token: newRefreshToken }
    return result
  }

  async getAllUser(payload: ParsedUrlQuery) {
    const pageIndex = Number(payload.pageIndex)
    const pageSize = Number(payload.pageSize)
    const query = String(payload.query ?? ' ')

    // TODO: Use text search index
    const users = await databaseService.users
      .find({ username: { $regex: query } })
      .limit(pageSize)
      .skip((pageIndex - 1) * pageSize)
      .toArray()

    // TODO: Make something like private attributes const in UserType
    const filteredUsers = _.map(users, (v) => _.omit(v, ['password', 'created_at', 'updated_at', 'email', 'phone', 'forgot_password_token', 'verify', '_destroy', 'password_change_at']))

    const result: PaginationType<Partial<User>> = {
      items: filteredUsers,
      pageIndex: pageIndex,
      pageSize: pageSize,
      totalRow: filteredUsers.length
    }

    return result
  }

  async getUserByID(id: ObjectId) {
    const user = await databaseService.users.findOne({ _id: id })
    if (!user) {
      throw new ErrorWithStatus({
        statusCode: StatusCodes.NOT_FOUND,
        message: VALIDATION_MESSAGES.USER.COMMONS.USER_WITH_ID_IS_NOT_EXIST
      })
    }
    return _.omit(user, 'password')
  }
}

const userServices = new UserService()
export default userServices
