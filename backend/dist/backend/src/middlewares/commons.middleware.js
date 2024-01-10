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
var commons_middleware_exports = {};
__export(commons_middleware_exports, {
  objectIdValidator: () => objectIdValidator,
  paginationValidator: () => paginationValidator,
  validateObjectId: () => validateObjectId
});
module.exports = __toCommonJS(commons_middleware_exports);
var import_express_validator = require("express-validator");
var import_http_status_codes = require("http-status-codes");
var import_mongodb = require("mongodb");
var import_message = require("@/constants/message");
var import_Errors = require("@/models/errors/Errors.schema");
var import_validate = __toESM(require("@/utils/validate"));
const paginationValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)({
    pageIndex: {
      trim: true,
      isInt: {
        options: {
          min: 1
        },
        errorMessage: import_message.VALIDATION_MESSAGES.PAGINATION.PAGE_CAN_NOT_LESS_THAN_ZERO
      }
    },
    pageSize: {
      trim: true,
      isInt: {
        options: {
          min: 1,
          max: 100
        },
        errorMessage: import_message.VALIDATION_MESSAGES.PAGINATION.ITEMS_IS_NOT_IN_RANGE
      }
    }
  })
);
const objectIdValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      id: {
        trim: true,
        custom: {
          options: async (value) => {
            if (!import_mongodb.ObjectId.isValid(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: import_message.VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
              });
            }
            return true;
          }
        }
      }
    },
    ["params"]
  )
);
const validateObjectId = (id) => {
  if (!import_mongodb.ObjectId.isValid(id)) {
    throw new import_Errors.ErrorWithStatus({
      message: import_message.VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
      statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  objectIdValidator,
  paginationValidator,
  validateObjectId
});
//# sourceMappingURL=commons.middleware.js.map
