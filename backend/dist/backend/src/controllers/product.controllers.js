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
var product_controllers_exports = {};
__export(product_controllers_exports, {
  default: () => product_controllers_default
});
module.exports = __toCommonJS(product_controllers_exports);
var import_http_status_codes = require("http-status-codes");
var import_product = __toESM(require("@/services/product.service"));
const productController = {
  getAllProduct: async (req, res, next) => {
    const result = await import_product.default.getAllProduct(req.query);
    res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  createProduct: async (req, res, next) => {
    const result = await import_product.default.createProduct(req.body, req.file);
    res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  updateProduct: async (req, res, next) => {
    const result = await import_product.default.updateProduct(req.params.id, req.body);
    res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  deleteProduct: async (req, res, next) => {
    const result = await import_product.default.deleteProduct(req.params.id);
    res.status(import_http_status_codes.StatusCodes.OK).json(result);
  },
  uploadImage: async (req, res, next) => {
    const result = await import_product.default.uploadImage(req.params.id, req.file);
    res.status(import_http_status_codes.StatusCodes.OK).json({ url: result });
  }
};
var product_controllers_default = productController;
//# sourceMappingURL=product.controllers.js.map
