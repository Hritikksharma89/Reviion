import mongoose, { Document, Model } from "mongoose";

const factory = <T extends Document> (model: Model<T>) => {
    return {
        find: async ( skip: string = "0", limit: string = "10", sort: string = "desc") => {
            return model.find().skip(Number(skip)).limit(Number(limit)).sort(sort).exec();
        },
        findById: async (_id: mongoose.Types.ObjectId) => {
            return model.findById(_id).exec();
        },
        create: async (payload: object) => {
            return model.create(payload);
        },
        deleteById: async (_id: mongoose.Types.ObjectId) => {
            return model.findByIdAndDelete(_id).exec();
        },
        updateById: async (_id: mongoose.Types.ObjectId, payload: object) => {
            return model.findByIdAndUpdate(_id, payload, { new: true }).exec();
        }
    };
};

export default factory;
