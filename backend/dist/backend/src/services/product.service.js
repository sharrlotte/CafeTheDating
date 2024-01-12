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
var product_service_exports = {};
__export(product_service_exports, {
  default: () => product_service_default
});
module.exports = __toCommonJS(product_service_exports);
var import_http_status_codes = require("http-status-codes");
var import_mongodb = require("mongodb");
var import_Errors = require("@/models/errors/Errors.schema");
var import_Like = __toESM(require("@/models/schemas/Like.shema"));
var import_Product = __toESM(require("@/models/schemas/Product.schema"));
var import_cloudinary = __toESM(require("@/services/cloudinary.service"));
var import_database = require("@/services/database.service");
class ProductService {
  async like(user, id) {
    try {
      if (!import_mongodb.ObjectId.isValid(id)) {
        throw new import_Errors.ErrorWithStatus({
          statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST,
          message: "Product id is invalid"
        });
      }
      let { _id } = user;
      const likeExists = await import_database.databaseService.likes.findOne({
        user_id: new import_mongodb.ObjectId(_id),
        prod_id: new import_mongodb.ObjectId(id)
      });
      if (!likeExists) {
        await import_database.databaseService.likes.insertOne(
          new import_Like.default({
            user_id: new import_mongodb.ObjectId(_id),
            prod_id: new import_mongodb.ObjectId(id)
          })
        );
      }
    } catch (error) {
      throw error;
    }
  }
  async unlike(user, id) {
    try {
      if (!import_mongodb.ObjectId.isValid(id)) {
        throw new import_Errors.ErrorWithStatus({
          statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST,
          message: "Invalid product id"
        });
      }
      let { _id } = user;
      await import_database.databaseService.likes.deleteOne({
        user_id: new import_mongodb.ObjectId(_id),
        prod_id: new import_mongodb.ObjectId(id)
      });
    } catch (error) {
      throw error;
    }
  }
  async getAllProduct(query) {
    const product_type = query.type;
    const sort = query.sort;
    const q = product_type ? { product_type } : {};
    switch (sort) {
      case "discount":
        return await import_database.databaseService.products.find({
          ...q,
          deleted: false,
          discount: {
            $gt: 0
          }
        }).sort({ discount: "desc" }).toArray();
      case "best-choice":
        return await import_database.databaseService.products.find({
          ...q,
          deleted: false,
          tags: {
            $in: ["best-choice"]
          }
        }).toArray();
      case "new":
        return await import_database.databaseService.products.find({
          ...q,
          deleted: false,
          tags: {
            $in: ["new"]
          }
        }).toArray();
      default:
        return await import_database.databaseService.products.find({
          ...q,
          deleted: false
        }).toArray();
    }
  }
  async createProduct(payload, file) {
    const { url } = await import_cloudinary.default.uploadImage("product", file.buffer);
    await import_database.databaseService.products.insertOne(new import_Product.default({ ...payload, image: url }));
  }
  async updateProduct(id, payload) {
    await import_database.databaseService.products.updateOne(
      { _id: new import_mongodb.ObjectId(id) },
      {
        $set: payload
      },
      {
        upsert: false
      }
    );
  }
  async deleteProduct(id) {
    await import_database.databaseService.products.updateOne(
      { _id: new import_mongodb.ObjectId(id) },
      {
        $set: {
          deleted: true
        }
      },
      { upsert: false }
    );
  }
  async uploadImage(id, image) {
    const result = await import_cloudinary.default.uploadImage("products", image.buffer);
    return result.url;
  }
}
const productService = new ProductService();
var product_service_default = productService;
//# sourceMappingURL=product.service.js.map
