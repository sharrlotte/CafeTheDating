import provinceController from "@/controllers/province.controller"
import { getDistrictValidator, getWardValidator } from "@/middlewares/province.middleware"
import { wrapRequestHandler } from "@/utils/handler"
import { Router } from "express"


const provinceRouter = Router()

// TODO: province validation middlewares
/**
 * Description: Get list province
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

provinceRouter.get('', wrapRequestHandler(provinceController.getProvince))

/**
 * Description: Get province and it's district
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

provinceRouter.get('/:id', getDistrictValidator, wrapRequestHandler(provinceController.getDistrict))

/**
 * Description: Get list province
 * Path: /
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */

provinceRouter.get('/:id/:did', getWardValidator, wrapRequestHandler(provinceController.getWard))

export default provinceRouter
