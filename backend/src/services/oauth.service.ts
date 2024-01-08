import passport from 'passport'
import { env } from '@/config/environment.config'
import { databaseService } from '@/services/database.service'
import User from '@/models/schemas/Users.schema'
import userServices from '@/services/users.service'
import RefreshToken from '@/models/schemas/RefreshToken.schema'
import { Request, Response } from 'express'
import { AuthProvider } from '@/@types/auth.type'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { ObjectId } from 'mongodb'

class AuthService {
  init() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.auth.google.client_id,
          clientSecret: env.auth.google.client_secret,
          callbackURL: env.auth.google.callback_url,
          passReqToCallback: true
        },
        async function (req, accessToken, refreshToken, profile, done) {
          try {
            let user = await databaseService.users.findOne<User>({ provider: 'google', providerId: profile.id })
            if (!user) {
              const newUser = new User({
                avatar: profile._json.picture,
                //@ts-ignore
                email: profile.email,
                username: profile.displayName,
                provider: 'google',
                providerId: profile.id
              })
              user = newUser
              await databaseService.users.insertOne(newUser)
              req.user = { ...newUser, _id: newUser._id.toString() }
              return done(null, newUser)
            }

            const avatar = profile._json.picture

            user = { ...user, avatar }

            await databaseService.users.updateOne(
              { _id: user._id },
              {
                $set: user
              }
            )
            req.user = { ...user, _id: user._id.toString() }
            return done(null, user)
          } catch (error) {
            return done(error, null)
          }
        }
      )
    )
  }
  async callback(provider: AuthProvider, req: Request, res: Response) {
    const { _id, role, email } = req.user
    const refresh_token = await userServices.signRefreshToken(_id.toString(), email, role)
    // if user is logged in but still login again
    await databaseService.refreshTokens.deleteOne({ user_id: new ObjectId(_id) })
    await databaseService.refreshTokens.insertOne(
      new RefreshToken({
        token: refresh_token,
        user_id: new ObjectId(_id)
      })
    )

    res.redirect(`${env.url.auth_success}?provider=${provider}&refresh_token=${refresh_token}`)
  }
}

const authService = new AuthService()
authService.init()
export default authService
