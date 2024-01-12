import { checkSchema } from 'express-validator'
import { StatusCodes } from 'http-status-codes'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import { productSorts } from '@/models/schemas/Product.schema'
import { productTypes } from '@/models/schemas/ProductType.schema'
import validate from '@/utils/validate'

export const getAllProductValidator = validate(
  checkSchema(
    {
      type: {
        trim: true,
        isString: {
          errorMessage: 'Product type must be a string'
        },
        optional: true,
        custom: {
          options: (value) => {
            if (!productTypes.includes(value)) {
              throw new ErrorWithStatus({
                message: 'Invalid product type',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }
            return true
          }
        }
      },
      sort: {
        trim: true,
        isString: {
          errorMessage: 'Sort must be a string'
        },
        optional: true,
        custom: {
          options: (value) => {
            if (!productSorts.includes(value)) {
              throw new ErrorWithStatus({
                message: 'Invalid sort string',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      }
    },
    ['query']
  )
)

export const createProductValidator = validate(
  checkSchema(
    {
      name: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product name can not be empty'
        },
        isString: {
          errorMessage: 'Product name must be a string'
        },
        isLength: {
          options: {
            min: 4,
            max: 40
          },
          errorMessage: 'Product name must have 4-40 characters'
        }
      },
      description: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product description can not be empty'
        },
        isString: {
          errorMessage: 'Product description must be a string'
        },
        isLength: {
          options: {
            min: 4,
            max: 200
          },
          errorMessage: 'Product description must have 4-200 characters'
        }
      },

      price: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product price can not be empty'
        },
        isDecimal: {
          errorMessage: 'Product price must be a decimal'
        },

        custom: {
          options: (value) => {
            if (value < 0) {
              throw new ErrorWithStatus({
                message: 'Product price must be greater than 0',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      },

      tags: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product price can not be empty'
        },
        isArray: {
          errorMessage: 'Product price must be a decimal'
        }
      },

      product_type: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product type can not be empty'
        },
        isString: {
          errorMessage: 'Product type must be a string'
        },
        custom: {
          options: (value) => {
            if (!productTypes.includes(value)) {
              throw new ErrorWithStatus({
                message: 'Invalid product type',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)

export const updateProductValidator = validate(
  checkSchema(
    {
      name: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product name can not be empty'
        },
        isString: {
          errorMessage: 'Product name must be a string'
        },
        isLength: {
          options: {
            min: 4,
            max: 40
          },
          errorMessage: 'Product name must have 4-40 characters'
        }
      },
      description: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product description can not be empty'
        },
        isString: {
          errorMessage: 'Product description must be a string'
        },
        isLength: {
          options: {
            min: 4,
            max: 200
          },
          errorMessage: 'Product description must have 4-200 characters'
        }
      },

      price: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product price can not be empty'
        },
        isDecimal: {
          errorMessage: 'Product price must be a decimal'
        },

        custom: {
          options: (value) => {
            if (value < 0) {
              throw new ErrorWithStatus({
                message: 'Product price must be greater than 0',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      },

      tags: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product price can not be empty'
        },
        isArray: {
          errorMessage: 'Product price must be a decimal'
        }
      },

      product_type: {
        trim: true,
        isEmpty: {
          errorMessage: 'Product type can not be empty'
        },
        isString: {
          errorMessage: 'Product type must be a string'
        },
        custom: {
          options: (value) => {
            if (!productTypes.includes(value)) {
              throw new ErrorWithStatus({
                message: 'Invalid product type',
                statusCode: StatusCodes.BAD_REQUEST
              })
            }

            return true
          }
        }
      }
    },
    ['body']
  )
)
