import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { StatusCodes } from 'http-status-codes'
import { ParsedUrlQuery } from 'querystring'
import { CreateProductBody } from '@/@types/request.type'
import productService from '@/services/product.service'

const productController = {
  getAllProduct: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await productService.getAllProduct(req.query)
    res.status(StatusCodes.OK).json(result)
  },
  createProduct: async (req: Request<ParamsDictionary, any, CreateProductBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await productService.createProduct(req.body, req.file)
    res.status(StatusCodes.OK).json(result)
  },
  updateProduct: async (req: Request<ParamsDictionary, any, CreateProductBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await productService.updateProduct(req.params.id, req.body)
    res.status(StatusCodes.OK).json(result)
  },
  deleteProduct: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await productService.deleteProduct(req.params.id)
    res.status(StatusCodes.OK).json(result)
  }
}

export default productController
