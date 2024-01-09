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
var order_controller_exports = {};
__export(order_controller_exports, {
  default: () => order_controller_default
});
module.exports = __toCommonJS(order_controller_exports);
var import_order = __toESM(require("@/services/order.service"));
var import_http_status_codes = require("http-status-codes");
const orderController = {
  getAllOrderByUser: async (req, res, next) => {
    const result = await import_order.default.getAllOrderByUser(req.query);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  createOrder: async (req, res, next) => {
    const result = await import_order.default.createOrder(req.user, req.body);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  updateOrder: async (req, res, next) => {
    const result = await import_order.default.updateOrder(req.params.id, req.body.state);
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  cancelOrder: async (req, res, next) => {
    const result = await import_order.default.updateOrder(req.params.id, "canceled");
    return res.status(import_http_status_codes.StatusCodes.OK).json(result);
  }
};
var order_controller_default = orderController;
