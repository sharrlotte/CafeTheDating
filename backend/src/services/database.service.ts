import { Db, MongoClient, ServerApiVersion, Collection } from 'mongodb'
import { env } from '~/config/environment.config'
import Product from '~/models/schemas/Product.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/Users.schema'
class DatabaseServices {
  private client: MongoClient | undefined
  private db: Db
  constructor() {
    this.client = new MongoClient(env.database.main.url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(env.database.main.name)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected to database')
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  async disconnect() {
    try {
      await this.client.close()
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }
  // Get collection user
  get users(): Collection<User> {
    return this.db.collection(env.database.main.collection.users as string)
  }

  // Get collection user
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(env.database.main.collection.refresh_tokens as string)
  }

  get products(): Collection<Product> {
    return this.db.collection(env.database.main.collection.product as string)
  }
}

export const databaseService = new DatabaseServices()
