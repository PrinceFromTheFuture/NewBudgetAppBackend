import mongoose, { model } from "mongoose";
import { sourceInterface } from "../types.js";
import UserModel from "./userModel.js";

const sourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  color: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});

const SourceModel: mongoose.Model<sourceInterface> = model<sourceInterface>("Source", sourceSchema);

export default SourceModel;
