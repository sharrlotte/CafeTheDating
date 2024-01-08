import { sendResponse } from '@/config/response.config'
import provinceService from '@/services/province.service'
import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedUrlQuery } from 'querystring'

const provinceController = {
  getProvince: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return await provinceService.getProvince()
  },
  getDistrict: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return await provinceService.getDistrict(req.params.id)
  },

  getWard: async (req: Request<ParamsDictionary, any, any, ParsedUrlQuery>, res: Response, next: NextFunction) => {
    return await provinceService.getWard(req.params.id, req.params.did)
  }
}

export default provinceController
