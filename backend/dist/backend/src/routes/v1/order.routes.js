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
var order_routes_exports = {};
__export(order_routes_exports, {
  default: () => order_routes_default
});
module.exports = __toCommonJS(order_routes_exports);
var import_enums = require("@/constants/enums");
var import_order = __toESM(require("@/controllers/order.controller"));
var import_auth = require("@/middlewares/auth.middlewares");
var import_commons = require("@/middlewares/commons.middleware");
var import_order2 = require("@/middlewares/order.middlewares");
var import_handler = require("@/utils/handler");
var import_express = require("express");
const orderRouter = (0, import_express.Router)();
orderRouter.get("/", import_auth.requireLoginMiddleware, (0, import_handler.wrapRequestHandler)(import_order.default.getAllOrderByUser));
orderRouter.post("/", import_auth.requireLoginMiddleware, import_order2.createOrderValidator, (0, import_handler.wrapRequestHandler)(import_order.default.createOrder));
orderRouter.put("/:id", (0, import_auth.requireRoleMiddleware)(import_enums.UserRole.Admin), import_commons.objectIdValidator, (0, import_handler.wrapRequestHandler)(import_order.default.updateOrder));
orderRouter.put("/:id/cancel", import_auth.requireLoginMiddleware, import_commons.objectIdValidator, (0, import_handler.wrapRequestHandler)(import_order.default.cancelOrder));
var order_routes_default = orderRouter;
