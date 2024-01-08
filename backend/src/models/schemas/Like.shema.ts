import { ObjectId } from 'mongodb'

interface LikeType {
  _id?: ObjectId
  user_id: ObjectId
  prod_id: ObjectId
  created_at?: Date
}

export default class Like {
  _id?: ObjectId
  user_id: ObjectId
  prod_id: ObjectId
  created_at: Date

  constructor(item: LikeType) {
    this._id = item._id
    this.user_id = item.user_id
    this.prod_id = item.prod_id
    this.created_at = item.created_at || new Date()
  }
}
