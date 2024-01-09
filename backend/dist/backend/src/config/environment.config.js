var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var environment_config_exports = {};
__export(environment_config_exports, {
  env: () => env
});
module.exports = __toCommonJS(environment_config_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_joi = __toESM(require("joi"));
import_dotenv.default.config();
const envSchema = import_joi.default.object({
  APP_PORT: import_joi.default.number().required(),
  APP_HOST: import_joi.default.string().required(),
  NODE_ENV: import_joi.default.string().valid("development", "production", "test").default("development"),
  DB_NAME: import_joi.default.string().required(),
  DB_REFRESH_TOKEN_COLLECTION: import_joi.default.string().required(),
  DB_PRODUCT_COLLECTION: import_joi.default.string().required(),
  DB_STAR_COLLECTION: import_joi.default.string().required(),
  DB_LIKE_COLLECTION: import_joi.default.string().required(),
  DB_ORDER_COLLECTION: import_joi.default.string().required(),
  MAIN_DATABASE_USERNAME: import_joi.default.string().required(),
  MAIN_DATABASE_PASSWORD: import_joi.default.string().required(),
  RATE_POINT: import_joi.default.number().required(),
  RATE_DURATION: import_joi.default.number().required(),
  PASSWORD_SECRET: import_joi.default.string().required(),
  JWT_ACCESS_TOKEN_SECRET: import_joi.default.string().required(),
  JWT_REFRESH_TOKEN_SECRET: import_joi.default.string().required(),
  ACCESS_TOKEN_EXPIRESIN: import_joi.default.string().required(),
  REFRESH_TOKEN_EXPIRESIN: import_joi.default.string().required(),
  JWT_ALGORITHM: import_joi.default.string().required(),
  COOKIES_EXPIRESIN: import_joi.default.number().required(),
  SECRET_COOKIE_NAME: import_joi.default.string().required(),
  CLOUDINARY_KEY: import_joi.default.string().required(),
  CLOUDINARY_SECRET: import_joi.default.string().required(),
  CLOUDINARY_NAME: import_joi.default.string().required(),
  CLOUDINARY_IMAGE_FOLDER: import_joi.default.string().required(),
  GOOGLE_AUTH_CLIENT_ID: import_joi.default.string().required(),
  GOOGLE_AUTH_CLIENT_SECRET: import_joi.default.string().required(),
  GOOGLE_AUTH_CALLBACK_URL: import_joi.default.string().required(),
  AUTH_SUCCESS_URL: import_joi.default.string().required(),
  AUTH_FAIL_URL: import_joi.default.string().required()
}).unknown().required();
const { error, value: envVars } = envSchema.prefs({ errors: { label: "key" } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const env = {
  node_env: envVars.NODE_ENV,
  client: {
    cookies_name: envVars.SECRET_COOKIE_NAME,
    cookies_exp: envVars.COOKIES_EXPIRESIN
  },
  server: {
    port: envVars.APP_PORT || 5e3,
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
        product: envVars.DB_PRODUCT_COLLECTION,
        star: envVars.DB_STAR_COLLECTION,
        like: envVars.DB_LIKE_COLLECTION,
        order: envVars.DB_ORDER_COLLECTION
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
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  env
});
