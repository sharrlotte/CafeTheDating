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
var order_service_exports = {};
__export(order_service_exports, {
  default: () => order_service_default
});
module.exports = __toCommonJS(order_service_exports);
var import_Order = __toESM(require("@/models/schemas/Order.schema"));
var import_database = require("@/services/database.service");
var import_mongodb = require("mongodb");
class OrderService {
  async getAllOrderByUser(query, userId) {
    const state = query.state;
    let orders;
    if (state && state !== "all") {
      orders = await import_database.databaseService.orders.find({ state, user_id: new import_mongodb.ObjectId(userId) }).sort("created_at", "desc").toArray();
    } else {
      orders = await import_database.databaseService.orders.find({ user_id: new import_mongodb.ObjectId(userId) }).toArray();
    }
    const items = orders.map(async (item) => {
      const product = await import_database.databaseService.products.findOne({ _id: new import_mongodb.ObjectId(item.product_id) });
      if (!product) {
        throw new Error("Order product not found");
      }
      item.product_name = product.name;
      return item;
    });
    return Promise.all(items);
  }
  async updateOrder(id, state) {
    return await import_database.databaseService.orders.findOneAndUpdate(
      { _id: new import_mongodb.ObjectId(id) },
      {
        $set: {
          state,
          updated_at: /* @__PURE__ */ new Date()
        }
      },
      { upsert: false }
    );
  }
  async createOrder(user, payload) {
    console.log(payload);
    const orders = payload.orders.map(async ({ amount, product_id }) => {
      const { price, discount } = await import_database.databaseService.products.findOne({ _id: new import_mongodb.ObjectId(product_id) });
      return new import_Order.default({
        address: payload.address,
        price,
        discount,
        amount,
        product_id: new import_mongodb.ObjectId(product_id),
        user_id: new import_mongodb.ObjectId(user._id),
        state: "pending"
      });
    });
    return await import_database.databaseService.orders.insertMany(await Promise.all(orders));
  }
}
const orderService = new OrderService();
var order_service_default = orderService;
//# sourceMappingURL=order.service.js.map
