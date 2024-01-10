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
var enums_exports = {};
__export(enums_exports, {
  TokenType: () => TokenType,
  UserRole: () => UserRole
});
module.exports = __toCommonJS(enums_exports);
var TokenType = /* @__PURE__ */ ((TokenType2) => {
  TokenType2["AccessToken"] = "AccessToken";
  TokenType2["RefreshToken"] = "RefreshToken";
  TokenType2["ForgotPasswordToken"] = "ForgotPasswordToken";
  TokenType2["OTPVerify"] = "OTPVerifyToken";
  return TokenType2;
})(TokenType || {});
var UserRole = /* @__PURE__ */ ((UserRole2) => {
  UserRole2["Admin"] = "Admin";
  UserRole2["Moderator"] = "Moderator";
  UserRole2["User"] = "User";
  return UserRole2;
})(UserRole || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TokenType,
  UserRole
});
//# sourceMappingURL=enums.js.map
