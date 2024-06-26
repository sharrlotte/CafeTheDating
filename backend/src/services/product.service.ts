import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { ParsedUrlQuery } from 'querystring'
import { AuthUser } from '@/@types/auth.type'
import { CreateProductBody, UpdateProductBody } from '@/@types/request.type'
import { ErrorWithStatus } from '@/models/errors/Errors.schema'
import Like from '@/models/schemas/Like.shema'
import Product, { ProductSort } from '@/models/schemas/Product.schema'
import ProductType from '@/models/schemas/ProductType.schema'
import cloudinaryService from '@/services/cloudinary.service'
import { databaseService } from '@/services/database.service'

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

    const q = product_type ? { product_type: product_type } : {}

    switch (sort) {
      case 'discount':
        return await databaseService.products
          .find({
            ...q,
            deleted: false,
            discount: {
              $gt: 0
            }
          })
          .sort({ discount: 'desc', _id: 'desc' })
          .toArray()

      case 'best-choice':
        return await databaseService.products
          .find({
            ...q,
            deleted: false,
            tags: {
              $in: ['best-choice']
            }
          })
          .sort({ _id: 'desc' })
          .toArray()

      case 'new':
        return await databaseService.products
          .find({
            ...q,
            deleted: false,
            tags: {
              $in: ['new']
            }
          })
          .sort({ _id: 'desc' })
          .toArray()

      default:
        return await databaseService.products
          .find({
            ...q,
            deleted: false
          })
          .sort({ _id: 'desc' })
          .toArray()
    }
  }

  async createProduct(payload: CreateProductBody, file: Express.Multer.File) {
    let url
    if (file) {
      url = (await cloudinaryService.uploadImage('product', file.buffer)).url
    }

    await databaseService.products.insertOne(new Product({ ...payload, image: url }))
  }
  async updateProduct(id: string, payload: UpdateProductBody, file: Express.Multer.File) {
    console.log(payload)
    let url
    if (file) {
      url = (await cloudinaryService.uploadImage('product', file.buffer)).url
    }

    const result = await databaseService.products.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: { ...payload, image: url }
      },
      {
        upsert: false
      }
    )
    if (url) {
      cloudinaryService.deleteImage(result.image)
    }
  }

  async deleteProduct(id: string) {
    await databaseService.products.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          deleted: true
        }
      },
      { upsert: false }
    )
  }
}

const productService = new ProductService()
export default productService
