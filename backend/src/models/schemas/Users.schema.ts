import { ObjectId } from 'mongodb'
import { AuthProvider } from '~/@types/auth.type'
import { UserRole } from '~/constants/enums'

// var number = moment().year()
//  - Number(moment('2000-02-22T00:00:00.000Z').format('YYYY'))
interface UserType {
  _id?: ObjectId
  username?: string
  email: string
  providerId?: string
  provider?: AuthProvider
  role?: UserRole
  address?: string
  avatar?: string
  _destroy?: Boolean
  created_at?: Date
  updated_at?: Date
}

export default class User {
  _id?: ObjectId
  fullName: string
  username?: string
  email: string
  providerId?: string
  provider?: AuthProvider
  role: UserRole
  address: string
  _destroy: Boolean
  created_at: Date
  updated_at: Date

  constructor(user: UserType) {
    this._id = user._id
    this.username = user.username
    this.email = user.email
    this.provider = user.provider
    this.providerId = user.providerId
    this.role = user.role || UserRole.User
    this.address = user.address || ''
    this._destroy = user._destroy || false
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || null
  }
}
