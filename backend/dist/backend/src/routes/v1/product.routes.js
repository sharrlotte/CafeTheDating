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
var product_routes_exports = {};
__export(product_routes_exports, {
  default: () => product_routes_default
});
module.exports = __toCommonJS(product_routes_exports);
var import_express = require("express");
var import_enums = require("@/constants/enums");
var import_product = __toESM(require("@/controllers/product.controllers"));
var import_auth = require("@/middlewares/auth.middlewares");
var import_commons = require("@/middlewares/commons.middleware");
var import_product2 = require("@/middlewares/product.middlewares");
var import_handler = require("@/utils/handler");
var import_uploadFile = __toESM(require("@/middlewares/uploadFile.middleware"));
const productRouter = (0, import_express.Router)();
productRouter.get("/", import_product2.getAllProductValidator, (0, import_handler.wrapRequestHandler)(import_product.default.getAllProduct));
productRouter.post("/", import_uploadFile.default.single("image"), (0, import_auth.requireRoleMiddleware)(import_enums.UserRole.Admin), import_product2.createProductValidator, (0, import_handler.wrapRequestHandler)(import_product.default.createProduct));
productRouter.put("/:id", import_uploadFile.default.single("image"), (0, import_auth.requireRoleMiddleware)(import_enums.UserRole.Admin), import_commons.objectIdValidator, import_product2.updateProductValidator, (0, import_handler.wrapRequestHandler)(import_product.default.updateProduct));
productRouter.delete("/:id", (0, import_auth.requireRoleMiddleware)(import_enums.UserRole.Admin), import_commons.objectIdValidator, (0, import_handler.wrapRequestHandler)(import_product.default.deleteProduct));
var product_routes_default = productRouter;
//# sourceMappingURL=product.routes.js.map
