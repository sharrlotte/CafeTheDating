import { ObjectId } from 'mongodb'
import { UserRole } from '~/constants/enums'

export type ResultRefreshTokenType = {
  access_token: string
  refresh_token: string
}

export type ResultLoginType = {
  _id: string
  fullName: string
  email: string
  access_token: string
  refresh_token: string
}

export type UserResponseType = {
  _id?: ObjectId
  username: string
  fullName?: string
  email: string
  phone?: string
  date_of_birth: Date
  age?: number
  role?: UserRole
  bio?: string
  address?: string
  website?: string
  avatar?: string
  cover_photo?: string
  isOnline?: Boolean
  created_at?: Date
  updated_at?: Date
}

export type PaginationType<T> = {
  items: T[]
  pageIndex: number
  pageSize: number
  totalRow: number
}
