import { ObjectId } from 'mongodb'
import { ParsedUrlQuery } from 'querystring'

export interface RefreshTokenBody {
  refresh_token: string
}
export interface InfoTokenType {
  _id: ObjectId
  email: string
  role: string
  token_type: string
  iat: number
  exp: number
}

export interface BlockUserBody {
  blockedId: string
}

export interface GetUsersByRoleQuery extends ParsedUrlQuery {
  includes: string
  pageNumber: string
  limit: string
}

export interface FavoriteBody {
  friendId: string
}
