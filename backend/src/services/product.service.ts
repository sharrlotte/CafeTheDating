import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { Multer } from 'multer'
import { ParsedUrlQuery } from 'querystring'
import { AuthUser } from '~/@types/auth.type'
import { CreateProductBody, ProductSort, UpdateProductBody } from '~/@types/request.type'
import { ErrorWithStatus } from '~/models/errors/Errors.schema'
import Like from '~/models/schemas/Like.shema'
import Product from '~/models/schemas/Product.schema'
import ProductType from '~/models/schemas/ProductType.schema'
import cloudinaryService from '~/services/cloudinary.service'
import { databaseService } from '~/services/database.service'

class ProductService {
  async like(user: AuthUser, id: string): Promise<void> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Product id is invalid'
        })
      }
      let { _id } = user

      const likeExists = await databaseService.likes.findOne({
        user_id: new ObjectId(_id),
        prod_id: new ObjectId(id)
      })

      if (!likeExists) {
        await databaseService.likes.insertOne(
          new Like({
            user_id: new ObjectId(_id),
            prod_id: new ObjectId(id)
          })
        )
      }
    } catch (error) {
      throw error
    }
  }

  async unlike(user: AuthUser, id: string): Promise<void> {
    try {
      if (!ObjectId.isValid(id)) {
        throw new ErrorWithStatus({
          statusCode: StatusCodes.BAD_REQUEST,
          message: 'Invalid product id'
        })
      }
      let { _id } = user
      await databaseService.likes.deleteOne({
        user_id: new ObjectId(_id),
        prod_id: new ObjectId(id)
      })
    } catch (error) {
      throw error
    }
  }

  async getAllProduct(query: ParsedUrlQuery) {
    const product_type: ProductType = query.type as ProductType
    const sort = query.sort as ProductSort

    switch (sort) {
      case 'discount':
        return await databaseService.products
          .find({
            product_type: product_type,
            discount: {
              $gt: 0
            }
          })
          .sort({ discount: 'desc' })
          .toArray()

      case 'best-choice':
        return await databaseService.products
          .find({
            product_type: product_type,
            tags: {
              $in: ['best-choice']
            }
          })
          .toArray()

      case 'new':
        return await databaseService.products
          .find({
            product_type: product_type,
            tags: {
              $in: ['new']
            }
          })
          .toArray()

      default:
        return await databaseService.products
          .find({
            product_type: product_type
          })
          .toArray()
    }
  }

  async createProduct(payload: CreateProductBody) {
    await databaseService.products.insertOne(new Product(payload))
  }
  async updateProduct(id: string, payload: UpdateProductBody) {
    await databaseService.products.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: payload
      },
      {
        upsert: false
      }
    )
  }

  async deleteProduct(id: string) {
    await databaseService.products.deleteOne({ _id: new ObjectId(id) })
  }

  async uploadImage(id: string, image: Express.Multer.File) {
    const result = await cloudinaryService.uploadImage('products', image.buffer)

    return result.url
  }
}

const productService = new ProductService()
export default productService
