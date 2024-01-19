import type { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

interface FactoryOptions {
  new: boolean
}

interface FactoryCRUD<T extends Document> {
  create(payload?: object): Promise<T>
  deleteMany(filter: FilterQuery<T>): Promise<void | any>
  deleteOne(filter: FilterQuery<T>): Promise<void | any>
  find(page?: string, limit?: string): Promise<T[]>
  findById(id: string): Promise<null | T>
  findByIdAndDelete(id: string): Promise<any | T>
  findByIdAndUpdate(update: UpdateQuery<T>, id: string, options?: FactoryOptions): Promise<null | T>
  findOne(filter: FilterQuery<T>): Promise<null | T>
  updateMany(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<void | any>
  updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<null | T>
}

/**
 * Factory function to generate CRUD methods for a Mongoose model.
 *
 * @param model - The Mongoose model to generate CRUD methods for
 * @returns An object with async CRUD methods for the model
 */

const Factory = <T extends Document>(model: Model<T>): FactoryCRUD<T> => ({
  // Create
  create: async (payload) => model.create(payload),
  deleteMany: async (filter) => model.deleteMany(filter),
  // Delete
  deleteOne: async (filter) => model.deleteOne(filter),
  // Find
  find: async (page, limit) =>
    model
      .find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ _id: -1 }),
  findById: async (id) => model.findById(id),

  findByIdAndDelete: async (id) => model.findByIdAndDelete(id),

  findByIdAndUpdate: async (update, id, options) =>
    model.findByIdAndUpdate(id, update || {}, {
      new: options?.new,
    }),
  findOne: async (filter) => model.findOne(filter),

  updateMany: async (filter, update) => model.updateMany(filter, update),
  // Update
  updateOne: async (filter, update) => model.findOneAndUpdate(filter, update, { new: true }),
})

export default Factory
