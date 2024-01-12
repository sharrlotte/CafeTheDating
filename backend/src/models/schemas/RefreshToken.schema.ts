import { ObjectId } from 'mongodb'

interface RefreshTokenType {
  user_id: ObjectId
  token: string
  created_at?: Date
  updated_at?: Date
}

export default class RefreshToken {
  id?: ObjectId
  user_id: ObjectId
  token: string
  created_at: Date
  updated_at: Date

  constructor(refreshToken: RefreshTokenType) {
    this.user_id = refreshToken.user_id
    this.token = refreshToken.token
    this.created_at = refreshToken.created_at || new Date()
    this.updated_at = refreshToken.updated_at || null
  }
}
