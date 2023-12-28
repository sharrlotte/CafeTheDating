import { ObjectId } from 'mongodb'
import { CreateStarBody } from '~/@types/request.type'
import Star from '~/models/schemas/Star.schema'
import { databaseService } from '~/services/database.service'

class StarService {
  async createStar(payload: CreateStarBody) {
    await databaseService.stars.insertOne(new Star({ ...payload, user_id: new ObjectId(payload.user_id) }))
  }
}

const starService = new StarService()
export default starService
