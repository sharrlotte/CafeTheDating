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
var province_service_exports = {};
__export(province_service_exports, {
  default: () => province_service_default
});
module.exports = __toCommonJS(province_service_exports);
var import_Errors = require("@/models/errors/Errors.schema");
var import_fs = __toESM(require("fs"));
var import_http_status_codes = require("http-status-codes");
var import_lodash = require("lodash");
const provinceData = JSON.parse(import_fs.default.readFileSync("province.json", "utf-8"));
class ProvinceService {
  async getProvince() {
    return provinceData.map((item) => (0, import_lodash.omit)(item, "districts"));
  }
  async getDistrict(province_code) {
    const province = provinceData.find((item) => item.code === Number(province_code));
    if (!province) {
      throw new import_Errors.ErrorWithStatus({
        message: "Province not found",
        statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
      });
    }
    return province.districts.map((item) => (0, import_lodash.omit)(item, "wards"));
  }
  async getWard(province_code, district_code) {
    const province = provinceData.find((item) => item.code === Number(province_code));
    if (!province) {
      throw new import_Errors.ErrorWithStatus({
        message: "Province not found",
        statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
      });
    }
    const district = province.districts.find((item) => item.code === Number(district_code));
    if (!district) {
      throw new import_Errors.ErrorWithStatus({
        message: "District not found",
        statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
      });
    }
    return district.wards;
  }
}
const provinceService = new ProvinceService();
var province_service_default = provinceService;
