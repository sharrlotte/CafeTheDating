import { UserRole } from '~/constants/enums'

export type AuthUser = {
  _id: string
  role: UserRole
  email: string
}

export const authProviders = ['facebook', 'google'] as const

export type AuthProvider = (typeof authProviders)[number]
