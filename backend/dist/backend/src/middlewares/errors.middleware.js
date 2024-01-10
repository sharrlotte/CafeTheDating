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
var errors_middleware_exports = {};
__export(errors_middleware_exports, {
  defaultErrorHandler: () => defaultErrorHandler
});
module.exports = __toCommonJS(errors_middleware_exports);
var import_lodash = require("lodash");
var import_http_status_codes = require("http-status-codes");
var import_Errors = require("@/models/errors/Errors.schema");
const defaultErrorHandler = (err, req, res, next) => {
  try {
    if (err instanceof import_Errors.ErrorWithStatus) {
      return res.status(err.statusCode).json((0, import_lodash.omit)(err, ["statusCode"]));
    }
    console.error(err);
    const finalError = {};
    Object.getOwnPropertyNames(err).forEach((key) => {
      if (!Object.getOwnPropertyDescriptor(err, key)?.configurable || !Object.getOwnPropertyDescriptor(err, key)?.writable) {
        return;
      }
      finalError[key] = err[key];
    });
    res.status(import_http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: finalError.message,
      errorInfo: (0, import_lodash.omit)(finalError, ["stack"])
    });
  } catch (error) {
    res.status(import_http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Internal server error",
      errorInfo: (0, import_lodash.omit)(error, ["stack"])
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultErrorHandler
});
//# sourceMappingURL=errors.middleware.js.map
