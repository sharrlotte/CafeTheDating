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
var cloudinary_service_exports = {};
__export(cloudinary_service_exports, {
  default: () => cloudinary_service_default
});
module.exports = __toCommonJS(cloudinary_service_exports);
var import_cloudinary = require("cloudinary");
var import_cloudinary_build_url = require("cloudinary-build-url");
var import_environment = require("@/config/environment.config");
var import_streamifier = __toESM(require("streamifier"));
var import_Errors = require("@/models/errors/Errors.schema");
var import_lodash = __toESM(require("lodash"));
import_cloudinary.v2.config({
  api_secret: import_environment.env.cloudinary.secret,
  api_key: import_environment.env.cloudinary.key,
  cloud_name: import_environment.env.cloudinary.cloud_name
});
class CloudinaryService {
  async uploadImage(folder, imageBuffer) {
    return await new Promise((resolve, reject) => {
      const stream = import_cloudinary.v2.uploader.upload_stream({ folder, format: "jpg" }, (error, result) => {
        if (result) {
          return resolve(result);
        }
        return reject(
          new import_Errors.ErrorWithStatus({
            statusCode: error.http_code,
            message: import_lodash.default.capitalize(error.message)
          })
        );
      });
      import_streamifier.default.createReadStream(imageBuffer).pipe(stream);
    });
  }
  async deleteImage(url) {
    return await new Promise((resolve, reject) => {
      const publicId = (0, import_cloudinary_build_url.extractPublicId)(url);
      import_cloudinary.v2.api.delete_resources([publicId], (error, result) => {
        if (result) {
          return resolve(result);
        }
        return reject(error);
      });
    });
  }
}
const cloudinaryService = new CloudinaryService();
var cloudinary_service_default = cloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map
