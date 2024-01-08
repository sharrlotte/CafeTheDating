import validate from '@/utils/validate'
import { checkSchema } from 'express-validator'

export const getDistrictValidator = validate(
  checkSchema({
    id: {
      trim: true,
      isInt: {
        options: {
          min: 0
        },
        errorMessage: 'Invalid province id'
      }
    }
  })
)

export const getWardValidator = validate(
  checkSchema({
    id: {
      trim: true,
      isInt: {
        options: {
          min: 0
        },
        errorMessage: 'Invalid province id'
      }
    },
    did: {
      trim: true,
      isInt: {
        options: {
          min: 0
        },
        errorMessage: 'Invalid district id'
      }
    }
  })
)
