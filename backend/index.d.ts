declare namespace Express {
  enum UserRole {
    Admin = 'Admin',
    Moderator = 'Moderator',
    User = 'User'
  }

  export interface Request {
    user?: {
      _id: string
      role: UserRole
      email: string
    }
  }
}
