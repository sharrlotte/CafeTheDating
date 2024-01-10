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
var validate_exports = {};
__export(validate_exports, {
  default: () => validate_default
});
module.exports = __toCommonJS(validate_exports);
var import_express_validator = require("express-validator");
var import_http_status_codes = require("http-status-codes");
var import_Errors = require("@/models/errors/Errors.schema");
const validate = (validations) => {
  return async (req, res, next) => {
    await validations.run(req);
    const errors = (0, import_express_validator.validationResult)(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorObject = errors.mapped();
    const entityError = new import_Errors.ErrorEnity({ errors: {} });
    for (const key in errorObject) {
      const { msg } = errorObject[key];
      if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
        if (msg instanceof import_Errors.ErrorWithStatus && msg.statusCode !== import_http_status_codes.StatusCodes.UNPROCESSABLE_ENTITY) {
          return next(msg);
        }
      }
      entityError.errors[key] = errorObject[key];
    }
    next(entityError);
  };
};
var validate_default = validate;
//# sourceMappingURL=validate.js.map
