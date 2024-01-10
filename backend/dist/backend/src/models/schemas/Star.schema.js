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
var Star_schema_exports = {};
__export(Star_schema_exports, {
  default: () => Star
});
module.exports = __toCommonJS(Star_schema_exports);
class Star {
  _id;
  user_id;
  product_id;
  created_at;
  updated_at;
  constructor(star) {
    this._id = star._id;
    this.user_id = star.user_id;
    this.product_id = star.product_id;
    this.created_at = star.created_at || /* @__PURE__ */ new Date();
    this.updated_at = star.updated_at || null;
  }
}
//# sourceMappingURL=Star.schema.js.map
