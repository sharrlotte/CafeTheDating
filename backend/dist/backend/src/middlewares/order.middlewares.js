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
var order_middlewares_exports = {};
__export(order_middlewares_exports, {
  adminUpdateOrder: () => adminUpdateOrder,
  createOrderValidator: () => createOrderValidator,
  getAllOrderValidator: () => getAllOrderValidator,
  userCancelOrder: () => userCancelOrder
});
module.exports = __toCommonJS(order_middlewares_exports);
var import_express_validator = require("express-validator");
var import_http_status_codes = require("http-status-codes");
var import_Errors = require("@/models/errors/Errors.schema");
var import_Order = require("@/models/schemas/Order.schema");
var import_validate = __toESM(require("@/utils/validate"));
var import_commons = require("@/middlewares/commons.middleware");
var import_database = require("@/services/database.service");
var import_mongodb = require("mongodb");
const getAllOrderValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      state: {
        trim: true,
        isString: {
          errorMessage: "Order type must be a string"
        },
        optional: true,
        custom: {
          options: (value) => {
            if (![import_Order.orderStates].includes(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: "Invalid order state",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        }
      }
    },
    ["query"]
  )
);
const adminUpdateOrder = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      state: {
        trim: true,
        isString: {
          errorMessage: "Order type must be a string"
        },
        custom: {
          options: (value) => {
            if (!import_Order.orderStates.includes(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: "Invalid order state",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        }
      },
      id: {
        trim: true,
        isString: {
          errorMessage: "Order id must be a string"
        },
        optional: true,
        custom: {
          options: (value) => {
            (0, import_commons.validateObjectId)(value);
            return true;
          }
        }
      }
    },
    ["params", "body"]
  )
);
const createOrderValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      address: {
        notEmpty: {
          errorMessage: "Address is required"
        },
        isString: { errorMessage: "Address must be a string" }
      },
      orders: {
        isArray: {
          errorMessage: "Orders must be an array",
          options: {
            min: 1
          }
        },
        toArray: true
      },
      "orders.*.product_id": {
        trim: true,
        isString: true,
        custom: {
          options: async (value) => {
            (0, import_commons.validateObjectId)(value);
            var product = await import_database.databaseService.products.findOne({ _id: new import_mongodb.ObjectId(value) });
            if (!product) {
              throw new import_Errors.ErrorWithStatus({
                message: "Product not found for id: " + value,
                statusCode: import_http_status_codes.StatusCodes.NOT_FOUND
              });
            }
            return true;
          }
        }
      },
      "orders.*.amount": {
        isInt: {
          options: {
            min: 1
          },
          errorMessage: "Invalid amount"
        }
      }
    },
    ["params", "body"]
  )
);
const userCancelOrder = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      id: {
        trim: true,
        isString: {
          errorMessage: "Sort must be a string"
        },
        optional: true,
        custom: {
          options: async (value, { req }) => {
            (0, import_commons.validateObjectId)(value);
            const order = await import_database.databaseService.orders.findOne({ _id: value, user_id: new import_mongodb.ObjectId(req.user._id) });
            if (!order) {
              throw new import_Errors.ErrorWithStatus({
                message: "Order is not exist or not belong to you",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        }
      }
    },
    ["params", "body"]
  )
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  adminUpdateOrder,
  createOrderValidator,
  getAllOrderValidator,
  userCancelOrder
});
//# sourceMappingURL=order.middlewares.js.map
