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
var RefreshToken_schema_exports = {};
__export(RefreshToken_schema_exports, {
  default: () => RefreshToken
});
module.exports = __toCommonJS(RefreshToken_schema_exports);
class RefreshToken {
  id;
  user_id;
  token;
  created_at;
  updated_at;
  constructor(refreshToken) {
    this.user_id = refreshToken.user_id;
    this.token = refreshToken.token;
    this.created_at = refreshToken.created_at || /* @__PURE__ */ new Date();
    this.updated_at = refreshToken.updated_at || null;
  }
}
//# sourceMappingURL=RefreshToken.schema.js.map
