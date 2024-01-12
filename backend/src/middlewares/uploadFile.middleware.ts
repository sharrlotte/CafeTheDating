import { StatusCodes } from 'http-status-codes'
import multer from 'multer'
import path from 'path'
import { VALIDATION_MESSAGES } from '@/constants/message'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'

const multerMiddleware = multer({
  limits: {
    fieldSize: 50 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    if (!file) {
      return callback(new Error('File not found'))
    }

    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      return callback(null, true)
    }

    callback(
      new ErrorWithStatus({
        statusCode: StatusCodes.BAD_REQUEST,
        message: VALIDATION_MESSAGES.UPLOAD.IMAGE.INVALID_IMAGE_EXTENSION
      })
    )
  }
})

export default multerMiddleware
