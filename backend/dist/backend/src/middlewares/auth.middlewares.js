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
var auth_middlewares_exports = {};
__export(auth_middlewares_exports, {
  authMiddleware: () => authMiddleware,
  requireLoginMiddleware: () => requireLoginMiddleware,
  requireRoleMiddleware: () => requireRoleMiddleware
});
module.exports = __toCommonJS(auth_middlewares_exports);
var import_http_status_codes = require("http-status-codes");
var import_environment = require("@/config/environment.config");
var import_message = require("@/constants/message");
var import_Errors = require("@/models/errors/Errors.schema");
var import_jwt = require("@/utils/jwt");
const authMiddleware = async (req, res, next) => {
  try {
    const bearer = req.get("Authorization");
    if (!bearer) {
      return next();
    }
    const tokens = bearer.split(" ");
    if (tokens.length !== 2) {
      throw new import_Errors.ErrorWithStatus({
        message: import_message.VALIDATION_MESSAGES.TOKEN.INVALID_BEARER_TOKEN,
        statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED
      });
    }
    const access_token = tokens[1];
    const user = await (0, import_jwt.verifyToken)({
      token: access_token,
      secretOrPublicKey: import_environment.env.jwt.secret_key
    });
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
const requireLoginMiddleware = () => {
  return [
    authMiddleware,
    (req, res, next) => {
      try {
        if (!req.user) {
          throw new import_Errors.ErrorWithStatus({
            statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED,
            message: import_message.VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
          });
        }
        return next();
      } catch (error) {
        return next(error);
      }
    }
  ];
};
const requireRoleMiddleware = (...roles) => {
  return [
    authMiddleware,
    async (req, res, next) => {
      try {
        if (!req.user || !roles.includes(req.user.role)) {
          throw new import_Errors.ErrorWithStatus({
            statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED,
            message: import_message.VALIDATION_MESSAGES.USER.COMMONS.USER_NOT_LOGIN
          });
        }
        return next();
      } catch (error) {
        return next(error);
      }
    }
  ];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  authMiddleware,
  requireLoginMiddleware,
  requireRoleMiddleware
});
