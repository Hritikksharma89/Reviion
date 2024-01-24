import { ITokenModel } from '@/interface/token.interface'
import { IUserModel } from '@/interface/users.interfaces'
import type { Document, FilterQuery, Model, UpdateQuery } from 'mongoose'

interface FactoryOptions {
  new: boolean
}

/**
 * Interface for factory CRUD methods for a Mongoose model.
 *
 * Provides promise-based methods corresponding to Mongoose CRUD operations.
 */

/**
 * Creates a factory for the given Mongoose model.
 *
 * The returned factory provides CRUD methods that call the equivalent
 * Mongoose model methods.
 */


type Model = Model<IUserModel|ITokenModel>
const Factory = (model:Model ) => ({
  /**
   * Creates a new document in the model by calling model.create() with the given payload.
   */
  create: async (payload) => await model.create(payload),
  /**
   * Deletes multiple documents from the model that match the filter.
   * Calls model.deleteMany() with the provided filter.
   */
  deleteMany: async (filter) => await model.deleteMany(filter),
  /**
   * Deletes a single document from the model that matches the filter.
   * Calls model.deleteOne() with the provided filter.
   */
  deleteOne: async (filter) => await model.deleteOne(filter),
  /**
   * Finds documents in the model.
   * Applies pagination by skipping and limiting results.
   * Sorts by _id descending.
   */
  find: async (page, limit) =>
    await model
      .find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ _id: -1 }),
  /**
   * Finds a document by its id.
   * Calls model.findById() with the provided id.
   */
  findById: async (id) => await model.findById(id),
  /**
   * Deletes a document by its id.
   * Calls model.findByIdAndDelete() with the provided id.
   */
  findByIdAndDelete: async (id) => await model.findByIdAndDelete(id),
  /**
   * Updates a document matched by the provided id.
   * Calls model.findByIdAndUpdate() with the id, update, and options.
   */
  findByIdAndUpdate: async (update, id, options) =>
    await model.findByIdAndUpdate(id, update || {}, {
      new: options?.new,
    }),
  /**
   * Finds a single document that matches the filter.
   * Calls model.findOne() with the provided filter.
   */
  findOne: async (filter) => await model.findOne(filter),
  /**
   * Updates multiple documents matched by the filter.
   * Calls model.updateMany() with the provided filter and update.
   */
  updateMany: async (filter, update) => await model.updateMany(filter, update),
  /**
   * Updates a single document matched by the filter.
   * Calls model.findOneAndUpdate() with the filter, update and options.
   */
  updateOne: async (filter, update) => await model.findOneAndUpdate(filter, update, { new: true }),
})

export default Factory
