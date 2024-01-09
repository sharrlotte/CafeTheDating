var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var crypto_exports = {};
__export(crypto_exports, {
  generateOTPCode: () => generateOTPCode,
  generatePassword: () => generatePassword,
  hashOTP: () => hashOTP,
  hashPassword: () => hashPassword,
  sha256: () => sha256
});
module.exports = __toCommonJS(crypto_exports);
var import_crypto = require("crypto");
var import_environment = require("@/config/environment.config");
const sha256 = (content) => (0, import_crypto.createHash)("sha256").update(content).digest("hex");
const generatePassword = () => (0, import_crypto.randomBytes)(8).toString("hex");
const hashPassword = (password) => sha256(password + import_environment.env.server.password_secret);
const generateOTPCode = () => (0, import_crypto.randomInt)(1e5, 999999).toString();
const hashOTP = (password) => sha256(password + import_environment.env.server.otp_secret);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateOTPCode,
  generatePassword,
  hashOTP,
  hashPassword,
  sha256
});
