import { ObjectId } from 'mongodb'

interface StarType {
  _id?: ObjectId
  user_id: ObjectId
  product_id: string
  created_at?: Date
  updated_at?: Date
}

export default class Star {
  _id?: ObjectId
  user_id: ObjectId
  product_id: string
  created_at: Date
  updated_at: Date

  constructor(star: StarType) {
    this._id = star._id
    this.user_id = star.user_id
    this.product_id = star.product_id
    this.created_at = star.created_at || new Date()
    this.updated_at = star.updated_at || null
  }
}
