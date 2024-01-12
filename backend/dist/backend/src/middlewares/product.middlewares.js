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
var product_middlewares_exports = {};
__export(product_middlewares_exports, {
  createProductValidator: () => createProductValidator,
  getAllProductValidator: () => getAllProductValidator,
  updateProductValidator: () => updateProductValidator
});
module.exports = __toCommonJS(product_middlewares_exports);
var import_express_validator = require("express-validator");
var import_http_status_codes = require("http-status-codes");
var import_Errors = require("@/models/errors/Errors.schema");
var import_Product = require("@/models/schemas/Product.schema");
var import_ProductType = require("@/models/schemas/ProductType.schema");
var import_validate = __toESM(require("@/utils/validate"));
const getAllProductValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      type: {
        trim: true,
        isString: {
          errorMessage: "Product type must be a string"
        },
        optional: true,
        custom: {
          options: (value) => {
            if (!import_ProductType.productTypes.includes(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: "Invalid product type",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        }
      },
      sort: {
        trim: true,
        isString: {
          errorMessage: "Sort must be a string"
        },
        optional: true,
        custom: {
          options: (value) => {
            if (!import_Product.productSorts.includes(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: "Invalid sort string",
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
const createProductValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      name: {
        trim: true,
        notEmpty: {
          errorMessage: "Product name can not be empty"
        },
        isString: {
          errorMessage: "Product name must be a string"
        },
        isLength: {
          options: {
            min: 4,
            max: 40
          },
          errorMessage: "Product name must have 4-40 characters"
        }
      },
      description: {
        trim: true,
        notEmpty: {
          errorMessage: "Product description can not be empty"
        },
        isString: {
          errorMessage: "Product description must be a string"
        },
        isLength: {
          options: {
            min: 4,
            max: 200
          },
          errorMessage: "Product description must have 4-200 characters"
        }
      },
      price: {
        trim: true,
        notEmpty: {
          errorMessage: "Product price can not be empty"
        },
        isDecimal: {
          errorMessage: "Product price must be a decimal"
        },
        custom: {
          options: (value) => {
            if (value < 0) {
              throw new import_Errors.ErrorWithStatus({
                message: "Product price must be greater than 0",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        }
      },
      tags: {
        trim: true,
        optional: true,
        isArray: {
          errorMessage: "Product tags must be a array"
        }
      },
      product_type: {
        trim: true,
        notEmpty: {
          errorMessage: "Product type can not be empty"
        },
        isString: {
          errorMessage: "Product type must be a string"
        },
        custom: {
          options: (value) => {
            if (!import_ProductType.productTypes.includes(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: "Invalid product type",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        }
      }
    },
    ["body"]
  )
);
const updateProductValidator = (0, import_validate.default)(
  (0, import_express_validator.checkSchema)(
    {
      name: {
        trim: true,
        notEmpty: {
          errorMessage: "Product name can not be empty"
        },
        isString: {
          errorMessage: "Product name must be a string"
        },
        isLength: {
          options: {
            min: 4,
            max: 40
          },
          errorMessage: "Product name must have 4-40 characters"
        },
        optional: true
      },
      description: {
        trim: true,
        notEmpty: {
          errorMessage: "Product description can not be empty"
        },
        isString: {
          errorMessage: "Product description must be a string"
        },
        isLength: {
          options: {
            min: 4,
            max: 200
          },
          errorMessage: "Product description must have 4-200 characters"
        },
        optional: true
      },
      price: {
        trim: true,
        notEmpty: {
          errorMessage: "Product price can not be empty"
        },
        isDecimal: {
          errorMessage: "Product price must be a decimal"
        },
        custom: {
          options: (value) => {
            if (value < 0) {
              throw new import_Errors.ErrorWithStatus({
                message: "Product price must be greater than 0",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        },
        optional: true
      },
      tags: {
        optional: true,
        trim: true,
        isArray: {
          errorMessage: "Tags must be an array"
        }
      },
      product_type: {
        trim: true,
        notEmpty: {
          errorMessage: "Product type can not be empty"
        },
        isString: {
          errorMessage: "Product type must be a string"
        },
        custom: {
          options: (value) => {
            if (!import_ProductType.productTypes.includes(value)) {
              throw new import_Errors.ErrorWithStatus({
                message: "Invalid product type",
                statusCode: import_http_status_codes.StatusCodes.BAD_REQUEST
              });
            }
            return true;
          }
        },
        optional: true
      }
    },
    ["body"]
  )
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createProductValidator,
  getAllProductValidator,
  updateProductValidator
});
//# sourceMappingURL=product.middlewares.js.map
