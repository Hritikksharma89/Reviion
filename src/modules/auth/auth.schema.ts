import mongoose from "mongoose";



export const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: {
    accessToken: { type: String },
    refreshToken: { type: String },
  },
  role: { type: String, required: true  },
  membership: { type: String, required: true },
  userId: { type: String, required: true },
});
