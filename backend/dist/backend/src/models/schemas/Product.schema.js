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
var Product_schema_exports = {};
__export(Product_schema_exports, {
  default: () => Product,
  productSorts: () => productSorts
});
module.exports = __toCommonJS(Product_schema_exports);
const productSorts = ["discount", "best-choice", "new"];
class Product {
  _id;
  price;
  name;
  product_type;
  tags;
  image;
  description;
  discount;
  created_at;
  updated_at;
  constructor(product) {
    this._id = product._id;
    this.name = product.name;
    this.description = product.description;
    this.discount = product.discount || 0;
    this.price = product.price;
    this.tags = product.tags;
    this.product_type = product.product_type;
    this.created_at = product.created_at || /* @__PURE__ */ new Date();
    this.updated_at = product.updated_at || null;
    this.image = product.image;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productSorts
});
