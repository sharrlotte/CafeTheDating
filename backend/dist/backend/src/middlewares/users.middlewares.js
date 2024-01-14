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
var users_middlewares_exports = {};
__export(users_middlewares_exports, {
  getAllUserValidator: () => getAllUserValidator,
  refreshTokenValidator: () => refreshTokenValidator
});
module.exports = __toCommonJS(users_middlewares_exports);
var import_message = require("@/constants/message");
var import_express_validator = require("express-validator");
var import_validate = __toESM(require("@/utils/validate"));
var import_Errors = require("@/models/errors/Errors.schema");
var import_http_status_codes = require("http-status-codes");
const refreshTokenValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      refresh_token: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!value) {
              throw new import_Errors.ErrorWithStatus({
                statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED,
                message: import_message.VALIDATION_MESSAGES.USER.REFRESH_TOKEN.REFRESH_TOKEN_IS_REQUIRED
              });
            }
            return true;
          }
        }
      }
    },
    ["body"]
  )
);
const getAllUserValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      query: {
        trim: true,
        isString: {
          errorMessage: import_message.VALIDATION_MESSAGES.USER.COMMONS.USERNAME_MUST_BE_STRING
        },
        optional: true
      },
      role: {
        trim: true,
        isString: {
          errorMessage: "Role must be a string"
        },
        notEmpty: {
          errorMessage: "Role is required"
        }
      }
    },
    ["query"]
  )
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllUserValidator,
  refreshTokenValidator
});
//# sourceMappingURL=users.middlewares.js.map
