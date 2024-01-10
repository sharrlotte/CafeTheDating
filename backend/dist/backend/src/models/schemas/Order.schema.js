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
var Order_schema_exports = {};
__export(Order_schema_exports, {
  default: () => Order,
  orderStates: () => orderStates
});
module.exports = __toCommonJS(Order_schema_exports);
const orderStates = ["pending", "accept", "shipping", "completed", "canceled", "refused"];
class Order {
  _id;
  price;
  discount;
  product_id;
  amount;
  address;
  user_id;
  state;
  created_at;
  updated_at;
  constructor(order) {
    this._id = order._id;
    this.state = order.state || "pending";
    this.price = order.price;
    this.discount = order.discount;
    this.product_id = order.product_id;
    this.amount = order.amount;
    this.address = order.address;
    this.user_id = order.user_id;
    this.created_at = order.created_at || /* @__PURE__ */ new Date();
    this.updated_at = order.updated_at || null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  orderStates
});
//# sourceMappingURL=Order.schema.js.map
