import { Router } from 'express'
import passport from 'passport'
import authController from '@/controllers/auth.controllers'
import authService from '@/services/oauth.service'
import { wrapRequestHandler } from '@/utils/handler'

authService.init()
const authRouter = Router()

/**
 * Description: Login with oauth2 callback, this is call by oauth2 provider
 * Path: /callback/<provider>
 * Method: GET
 */

authRouter.get('/facebook', passport.authenticate('facebook', { session: false }))
authRouter.get('/google', passport.authenticate('google', { session: false, scope: ['profile'] }))

authRouter.get('/callback/facebook', passport.authenticate('facebook', { session: false }), wrapRequestHandler(authController.callback('facebook')))
authRouter.get('/callback/google', passport.authenticate('google', { session: false }), wrapRequestHandler(authController.callback('google')))

export default authRouter
