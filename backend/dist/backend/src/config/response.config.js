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
var response_config_exports = {};
__export(response_config_exports, {
  sendResponse: () => sendResponse
});
module.exports = __toCommonJS(response_config_exports);
var import_moment = __toESM(require("moment"));
var import_http_status_codes = require("http-status-codes");
const sendResponse = {
  noContent: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.NO_CONTENT).json({
      statusCode: import_http_status_codes.StatusCodes.NO_CONTENT,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  badRequest: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.BAD_REQUEST).json({
      statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  unauthorized: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.UNAUTHORIZED).json({
      statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  forbidden: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.FORBIDDEN).json({
      statusCode: import_http_status_codes.StatusCodes.FORBIDDEN,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  notFound: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.NOT_FOUND).json({
      statusCode: import_http_status_codes.StatusCodes.NOT_FOUND,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  noAcceptable: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.NOT_ACCEPTABLE).json({
      statusCode: import_http_status_codes.StatusCodes.NOT_ACCEPTABLE,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  conflict: (res, data, message, note) => {
    res.status(import_http_status_codes.StatusCodes.CONFLICT).json({
      statusCode: import_http_status_codes.StatusCodes.CONFLICT,
      message,
      data,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  tooManyRequest: (res, message, note) => {
    res.status(import_http_status_codes.StatusCodes.TOO_MANY_REQUESTS).json({
      statusCode: import_http_status_codes.StatusCodes.TOO_MANY_REQUESTS,
      message,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  },
  error: (res, message, note) => {
    res.status(import_http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: import_http_status_codes.StatusCodes.INTERNAL_SERVER_ERROR,
      message,
      dateTime: (0, import_moment.default)(/* @__PURE__ */ new Date()).format("DD-MM-YYYY\\tHH:mm:ssSSS"),
      messageConstants: note
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendResponse
});
