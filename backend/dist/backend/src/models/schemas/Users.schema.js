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
var Users_schema_exports = {};
__export(Users_schema_exports, {
  default: () => User
});
module.exports = __toCommonJS(Users_schema_exports);
var import_enums = require("@/constants/enums");
class User {
  _id;
  fullName;
  username;
  email;
  providerId;
  avatar;
  provider;
  role;
  address;
  _destroy;
  created_at;
  updated_at;
  constructor(user) {
    this._id = user._id;
    this.username = user.username;
    this.email = user.email;
    this.provider = user.provider;
    this.providerId = user.providerId;
    this.address = user.avatar;
    this.role = user.role || import_enums.UserRole.User;
    this.address = user.address || "";
    this._destroy = user._destroy || false;
    this.created_at = user.created_at || /* @__PURE__ */ new Date();
    this.updated_at = user.updated_at || null;
  }
}
