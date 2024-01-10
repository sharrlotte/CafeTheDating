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
var Like_shema_exports = {};
__export(Like_shema_exports, {
  default: () => Like
});
module.exports = __toCommonJS(Like_shema_exports);
class Like {
  _id;
  user_id;
  prod_id;
  created_at;
  constructor(item) {
    this._id = item._id;
    this.user_id = item.user_id;
    this.prod_id = item.prod_id;
    this.created_at = item.created_at || /* @__PURE__ */ new Date();
  }
}
//# sourceMappingURL=Like.shema.js.map
