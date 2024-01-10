var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var message_exports = {};
__export(message_exports, {
  AUTH_MESSAGES: () => AUTH_MESSAGES,
  CLIENT_MESSAGE: () => CLIENT_MESSAGE,
  CLOUDINARY_MESSAGES: () => CLOUDINARY_MESSAGES,
  DATABASE_MESSAGE: () => DATABASE_MESSAGE,
  ENV_MESSAGE: () => ENV_MESSAGE,
  JWT_MESSAGES: () => JWT_MESSAGES,
  REQUEST_QUERY_MESSAGES: () => REQUEST_QUERY_MESSAGES,
  URL_MESSAGES: () => URL_MESSAGES,
  VALIDATION_MESSAGES: () => VALIDATION_MESSAGES
});
module.exports = __toCommonJS(message_exports);
const DATABASE_MESSAGE = {
  DB_MAIN: {
    NAME: "Database access name in the ",
    USERNAME: "Username credentials to access the database main",
    PASSWORD: "Password credentials to access the database main ",
    CONNECT: "\u{1F331} Connected to DB Code Arena successfully!",
    DISCONNECT: "\u26D4\uFE0F Disconnected from the database main successfully!",
    USER_COLLECTION: "The table holds user information in the database.",
    REFRESH_TOKEN_COLLECTION: "The table holds refresh-token information in the database.",
    OTP_COLLECTION: "The table holds otp information in the database.",
    FOLLOW_COLLECTION: "The table holds follow information in the database.",
    BLOCKED_USER_COLLECTION: "The table holds user block user information in the database.",
    CLOSE_FRIENDS_COLLECTION: "The table holds close friends information in the database."
  }
};
const JWT_MESSAGES = {
  JWT_SECRET_KEY: "This \u201CSecret\u201D string is unique to the application and must be prioritized and carefully stored securely on the server side.",
  JWT_REFRESH_TOKEN_KEY: "This \u201CSecret\u201D string is unique to the application and must be prioritized and carefully stored securely on the server side.",
  ACCESS_TOKEN_EXPIRES_IN: "Duration of existence of access_token",
  REFRESH_TOKEN_EXPIRES_IN: "Duration of existence of access_token",
  JWT_ALGORITHM: "List of strings with the names of the allowed algorithms"
};
const ENV_MESSAGE = {
  PORT: "Port server is using",
  HOST: "Host server is using",
  DEV: "Environment is a collection of procedures and tools for developing, testing and debugging an application or program.",
  PROD: "Environment contains just the final version of the product in order to avoid any confusion or security vulnerabilities",
  TEST: "Environment is where the testing teams analyze the quality of the application/program."
};
const CLIENT_MESSAGE = {
  REQ_POINT: "Maximum number of points can be consumed over duration",
  REQ_DURATION: "Number of seconds before consumed points are reset.",
  PASSWORD_SECRET: "String of numeric or character values used in security systems",
  OTP_SECRET: "String of numeric or character values used in security systems",
  COOKIES_EXPIRES_IN: "Cookie expires in the system",
  SECRET_COOKIE_NAME: "Cookies_name when user login and register success and save local"
};
const VALIDATION_MESSAGES = {
  TITLE: "Validation Error",
  PAGINATION: {
    PAGE_CAN_NOT_LESS_THAN_ZERO: "Page number cannot less than zero",
    ITEMS_IS_NOT_IN_RANGE: "Item per page can not less than zero and greater than 100"
  },
  UPLOAD: {
    IMAGE: {
      INVALID_IMAGE_EXTENSION: "Image extension is invalid",
      INVALID_IMAGE_SIZE: "Image is too large"
    }
  },
  USER: {
    COMMONS: {
      USER_WITH_ID_IS_NOT_EXIST: "User with id is not exist",
      USER_ID_MUST_BE_A_STRING: "User id must be a string",
      USER_ID_CAN_NOT_BE_EMPTY: "User id cannot be empty",
      USER_NOT_LOGIN: "You must logged in to continue",
      USER_NOT_ROLE_NOT_SATISFIED: "You don not have the right role to access this resources",
      USER_ID_IS_INVALID: "User id is invalid",
      USERNAME_MUST_BE_STRING: "Username must be a string"
    },
    REFRESH_TOKEN: {
      REFRESH_TOKEN_IS_REQUIRED: "Refresh token is required",
      REFRESH_TOKEN_IS_NOT_EXIST: "Refresh token is not exist"
    }
  },
  TOKEN: {
    ACCESS_TOKEN_IS_REQUIRED: "Access_token is required",
    ACCESS_TOKEN_MUST_BE_A_STRING: "Access_token must be a string",
    INVALID_BEARER_TOKEN: "Invalid bearer token",
    REFRESH_TOKEN_IS_REQUIRED: "Refresh_token is required",
    REFRESH_TOKEN_MUST_BE_A_STRING: "Refresh_token must be a string",
    REFRESH_TOKEN_USED_OR_NOT_EXIST: "Used refresh token or not exist",
    REFRESH_TOKEN_IS_NOT_EXIST_IN_COOKIES: "No refresh token in cookies!"
  }
};
const REQUEST_QUERY_MESSAGES = {
  MAX_ITEM_PER_PAGE: "How many items per page"
};
const CLOUDINARY_MESSAGES = {
  CLOUDINARY_KEY: "Key to access cloudinary",
  CLOUDINARY_SECRET: "Password to access cloudinary",
  CLOUDINARY_NAME: "Cloud name of current cloudinary account",
  CLOUDINARY_AVATAR_FOLDER: "Folder that contain avatar images on cloudinary",
  CLOUDINARY_THUMBNAIL_FOLDER: "Folder that contain thumbnail images on cloudinary"
};
const AUTH_MESSAGES = {
  FACEBOOK: {
    CLIENT_ID: "ID to login with facebook and oauth2",
    CLIENT_SECRET: "Password to login with facebook and oauth2",
    CALLBACK_URL: "Url that facebook callback when authenticate"
  },
  GOOGLE: {
    CLIENT_ID: "ID to login with google and oauth2",
    CLIENT_SECRET: "Password to login with google and oauth2",
    CALLBACK_URL: "Url that google callback when authenticate"
  }
};
const URL_MESSAGES = {
  AUTH_SUCCESS_URL: "URL that user get redirected when authenticate success",
  AUTH_FAIL_URL: "URL that user get redirected when authenticate fail"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUTH_MESSAGES,
  CLIENT_MESSAGE,
  CLOUDINARY_MESSAGES,
  DATABASE_MESSAGE,
  ENV_MESSAGE,
  JWT_MESSAGES,
  REQUEST_QUERY_MESSAGES,
  URL_MESSAGES,
  VALIDATION_MESSAGES
});
//# sourceMappingURL=message.js.map
