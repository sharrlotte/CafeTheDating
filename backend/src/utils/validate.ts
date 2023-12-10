import { Request, Response, NextFunction } from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { StatusCodes } from 'http-status-codes'
import { ErrorEnity, ErrorWithStatus } from '~/models/errors/Errors.schema'

const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Truyền req vào để tiến hành validate dữ liệu
    await validations.run(req)
    // Đưa lỗi vào biến req -> gọi validation result để nhận lỗi
    const errors = validationResult(req)
    // Không có lỗi thì next tiếp tục request
    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped()
    const entityError = new ErrorEnity({ errors: {} })
    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (Object.prototype.hasOwnProperty.call(errorObject, key)) {
        // msg có tồn tại trong ErrorWithStatus và status phải khác với 422 tức là lỗi validation
        if (msg instanceof ErrorWithStatus && msg.statusCode !== StatusCodes.UNPROCESSABLE_ENTITY) {
          return next(msg)
        }
      }
      entityError.errors[key] = errorObject[key]
    }
    // Lỗi do validation thông thường
    next(entityError)
  }
}

export default validate
