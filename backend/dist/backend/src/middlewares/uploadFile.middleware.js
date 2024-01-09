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
var uploadFile_middleware_exports = {};
__export(uploadFile_middleware_exports, {
  singleImageUpload: () => singleImageUpload
});
module.exports = __toCommonJS(uploadFile_middleware_exports);
var import_http_status_codes = require("http-status-codes");
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var import_message = require("@/constants/message");
var import_Errors = require("@/models/errors/Errors.schema");
const uploadFile = (0, import_multer.default)({
  limits: {
    fieldSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(import_path.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return callback(null, true);
    }
    callback(new Error("Error"));
  }
});
const singleImageUpload = (req, res, next) => {
  uploadFile.single("image")(req, res, (err) => {
    if (err instanceof import_multer.default.MulterError) {
      next(
        new import_Errors.ErrorWithStatus({
          statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST,
          message: import_message.VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_SIZE
        })
      );
    }
    if (err instanceof Error) {
      next(
        new import_Errors.ErrorWithStatus({
          statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST,
          message: import_message.VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_EXTENSION
        })
      );
    }
    next();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  singleImageUpload
});
