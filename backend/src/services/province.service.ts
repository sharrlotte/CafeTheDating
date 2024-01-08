import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import Province from '@/models/schemas/Province.schema'
import fs from 'fs'
import { StatusCodes } from 'http-status-codes'
import { omit } from 'lodash'

const provinceData = JSON.parse(fs.readFileSync('province.json', 'utf-8')) as Province[]

class ProvinceService {
  async getProvince() {
    return provinceData.map((item) => omit(item, 'districts'))
  }

  async getDistrict(province_code: string) {
    const province = provinceData.find((item) => item.code === Number(province_code))
    if (!province) {
      throw new ErrorWithStatus({
        message: 'Province not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return province.districts.map((item) => omit(item, 'wards'))
  }

  async getWard(province_code: string, district_code: string) {
    const province = provinceData.find((item) => item.code === Number(province_code))
    if (!province) {
      throw new ErrorWithStatus({
        message: 'Province not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    const district = province.districts.find((item) => item.code === Number(district_code))

    if (!district) {
      throw new ErrorWithStatus({
        message: 'District not found',
        statusCode: StatusCodes.NOT_FOUND
      })
    }

    return district.wards
  }
}
const provinceService = new ProvinceService()
export default provinceService
