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
var province_routes_exports = {};
__export(province_routes_exports, {
  default: () => province_routes_default
});
module.exports = __toCommonJS(province_routes_exports);
var import_province = __toESM(require("@/controllers/province.controller"));
var import_province2 = require("@/middlewares/province.middleware");
var import_handler = require("@/utils/handler");
var import_express = require("express");
const provinceRouter = (0, import_express.Router)();
provinceRouter.get("", (0, import_handler.wrapRequestHandler)(import_province.default.getProvince));
provinceRouter.get("/:id", import_province2.getDistrictValidator, (0, import_handler.wrapRequestHandler)(import_province.default.getDistrict));
provinceRouter.get("/:id/:did", import_province2.getWardValidator, (0, import_handler.wrapRequestHandler)(import_province.default.getWard));
var province_routes_default = provinceRouter;
