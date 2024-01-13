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
var users_controllers_exports = {};
__export(users_controllers_exports, {
  default: () => users_controllers_default
});
module.exports = __toCommonJS(users_controllers_exports);
var import_users = __toESM(require("@/services/users.service"));
var import_mongodb = require("mongodb");
var import_http_status_codes = require("http-status-codes");
var import_order = __toESM(require("@/services/order.service"));
const userController = {
  refreshToken: async (req, res, next) => {
    const result = await import_users.default.refreshToken(req.body);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  getAllUser: async (req, res, next) => {
    const result = await import_users.default.getAllUser(req.query);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  getUser: async (req, res, next) => {
    const result = await import_users.default.getUserByID(new import_mongodb.ObjectId(req.params.id));
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  getMe: async (req, res, next) => {
    const result = await import_users.default.getUserByID(new import_mongodb.ObjectId(req.user._id));
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  changeRole: async (req, res, next) => {
    const result = await import_users.default.changeRole(req.params.id, req.body.role);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  getMeAllOrder: async (req, res, next) => {
    const result = await import_order.default.getAllOrderByUser(req.query, req.user._id);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  }
};
var users_controllers_default = userController;
//# sourceMappingURL=users.controllers.js.map
