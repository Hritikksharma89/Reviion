import { mode } from 'crypto-js';
import mongoose, { Document, Model } from 'mongoose';

const factory = <T extends Document>(model: Model<T>) => {
  return {
    find: async (skip: string = '0', limit: string = '10', sort: string = 'desc') => {
      return await model.find().skip(Number(skip)).limit(Number(limit)).sort(sort).exec();
    },
    findByEmail: async (email: string) => {
      return await model.find({ email }).exec();
    },
    findByUserId: async (userId: mongoose.Types.ObjectId) => {
      return await model.find({ userId }).exec();
    },
    findById: async (_id: mongoose.Types.ObjectId) => {
      return await model.findById(_id).exec();
    },
    create: async (payload: object) => {
      return await model.create(payload);
    },
    deleteById: async (_id: mongoose.Types.ObjectId) => {
      return await model.findByIdAndDelete(_id).exec();
    },
    updateById: async (_id: mongoose.Types.ObjectId, payload: object) => {
      return await model.findByIdAndUpdate(_id, payload, { new: true }).exec();
    },
  };
};

export default factory;
