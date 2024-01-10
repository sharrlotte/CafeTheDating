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
var jwt_exports = {};
__export(jwt_exports, {
  signToken: () => signToken,
  verifyToken: () => verifyToken
});
module.exports = __toCommonJS(jwt_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_Errors = require("@/models/errors/Errors.schema");
var import_http_status_codes = require("http-status-codes");
const signToken = ({ payload, privateKey, options }) => {
  return new Promise((resolve, reject) => {
    import_jsonwebtoken.default.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(new import_Errors.ErrorWithStatus({ message: err.message, statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED }));
      }
      resolve(token);
    });
  });
};
const verifyToken = ({ token, secretOrPublicKey }) => {
  return new Promise((resolve, reject) => {
    import_jsonwebtoken.default.verify(token, secretOrPublicKey, function(err, decoded) {
      if (err) {
        reject(new import_Errors.ErrorWithStatus({ message: err.message, statusCode: import_http_status_codes.StatusCodes.UNAUTHORIZED }));
      }
      resolve(decoded);
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  signToken,
  verifyToken
});
//# sourceMappingURL=jwt.js.map
