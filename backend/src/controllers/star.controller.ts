import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { StatusCodes } from 'http-status-codes'
import { ParsedUrlQuery } from 'querystring'
import { CreateStarBody } from '@/@types/request.type'
import starService from '@/services/star.service'

const starController = {
  createStar: async (req: Request<ParamsDictionary, any, CreateStarBody, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    const result = await starService.createStar(req.body)
    res.status(StatusCodes.OK).json(result)
  }
}

export default starController
