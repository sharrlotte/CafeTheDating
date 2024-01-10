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
var star_middlewares_exports = {};
__export(star_middlewares_exports, {
  createStarValidator: () => createStarValidator
});
module.exports = __toCommonJS(star_middlewares_exports);
var import_express_validator = require("express-validator");
var import_http_status_codes = require("http-status-codes");
var import_mongodb = require("mongodb");
var import_message = require("@/constants/message");
var import_Errors = require("@/models/errors/Errors.schema");
var import_database = require("@/services/database.service");
var import_validate = __toESM(require("@/utils/validate"));
const createStarValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      productId: {
        trim: true,
        custom: {
          options: async (value, { req }) => {
            if (!import_mongodb.ObjectId.isValid(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: import_message.VALIDATION_MESSAGES.USER.COMMONS.USER_ID_IS_INVALID,
                statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
              });
            }
            const result = await import_database.databaseService.stars.findOne({
              user_id: req.user._id,
              product_id: value
            });
            if (Boolean(result)) {
              throw new import_Errors.ErrorWithStatus({
                message: "You already start this product",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStarValidator
});
