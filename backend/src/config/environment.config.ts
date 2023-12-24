import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

// Validation schema env
const envSchema = Joi.object({
  APP_PORT: Joi.number().required(),
  APP_HOST: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  DB_NAME: Joi.string().required(),
  DB_REFRESH_TOKEN_COLLECTION: Joi.string().required(),
  DB_PRODUCT_COLLECTION: Joi.string().required(),
  MAIN_DATABASE_USERNAME: Joi.string().required(),
  MAIN_DATABASE_PASSWORD: Joi.string().required(),
  RATE_POINT: Joi.number().required(),
  RATE_DURATION: Joi.number().required(),
  PASSWORD_SECRET: Joi.string().required(),
  JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_EXPIRESIN: Joi.string().required(),
  REFRESH_TOKEN_EXPIRESIN: Joi.string().required(),
  JWT_ALGORITHM: Joi.string().required(),
  COOKIES_EXPIRESIN: Joi.number().required(),
  SECRET_COOKIE_NAME: Joi.string().required(),
  CLOUDINARY_KEY: Joi.string().required(),
  CLOUDINARY_SECRET: Joi.string().required(),
  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_IMAGE_FOLDER: Joi.string().required(),
  FACEBOOK_AUTH_CLIENT_ID: Joi.string().required(),
  FACEBOOK_AUTH_CLIENT_SECRET: Joi.string().required(),
  FACEBOOK_AUTH_CALLBACK_URL: Joi.string().required(),
  GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
  GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_AUTH_CALLBACK_URL: Joi.string().required(),
  AUTH_SUCCESS_URL: Joi.string().required(),
  AUTH_FAIL_URL: Joi.string().required()
})
  .unknown()
  .required()

// Validate the environment variables
const { error, value: envVars } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const env = {
  node_env: envVars.NODE_ENV,
  client: {
    cookies_name: envVars.SECRET_COOKIE_NAME,
    cookies_exp: envVars.COOKIES_EXPIRESIN
  },
  server: {
    port: envVars.APP_PORT || 5000,
    host: envVars.APP_HOST,
    rate_point: envVars.RATE_POINT,
    rate_duration: envVars.RATE_POINT,
    password_secret: envVars.PASSWORD_SECRET,
    otp_secret: envVars.OTP_SECRET
  },
  database: {
    main: {
      url: `mongodb+srv://${envVars.MAIN_DATABASE_USERNAME}:${envVars.MAIN_DATABASE_PASSWORD}@cluster0.51lyyqx.mongodb.net/?retryWrites=true&w=majority`,
      name: envVars.DB_NAME,
      collection: {
        users: envVars.DB_USER_COLLECTION,
        refresh_tokens: envVars.DB_REFRESH_TOKEN_COLLECTION,
        product: envVars.DB_PRODUCT_COLLECTION
      }
    }
  },
  jwt: {
    secret_key: envVars.JWT_ACCESS_TOKEN_SECRET,
    refresh_token_key: envVars.JWT_REFRESH_TOKEN_SECRET,
    access_token_exp: envVars.ACCESS_TOKEN_EXPIRESIN,
    refresh_token_exp: envVars.REFRESH_TOKEN_EXPIRESIN,
    jwt_algorithm: envVars.JWT_ALGORITHM
  },
  request: {
    max_items: 20
  },
  auth: {
    facebook: {
      client_id: envVars.FACEBOOK_AUTH_CLIENT_ID,
      client_secret: envVars.FACEBOOK_AUTH_CLIENT_SECRET,
      callback_url: envVars.FACEBOOK_AUTH_CALLBACK_URL
    },
    google: {
      client_id: envVars.GOOGLE_AUTH_CLIENT_ID,
      client_secret: envVars.GOOGLE_AUTH_CLIENT_SECRET,
      callback_url: envVars.GOOGLE_AUTH_CALLBACK_URL
    }
  },
  url: {
    auth_success: envVars.AUTH_SUCCESS_URL,
    auth_fail: envVars.AUTH_FAIL_URL
  },
  cloudinary: {
    secret: envVars.CLOUDINARY_SECRET,
    key: envVars.CLOUDINARY_KEY,
    cloud_name: envVars.CLOUDINARY_NAME,
    image_folder: envVars.CLOUDINARY_IMAGE_FOLDER
  }
}
