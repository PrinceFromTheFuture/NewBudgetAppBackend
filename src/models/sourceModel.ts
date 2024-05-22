import mongoose, { model } from "mongoose";
import { sourceInterface } from "../types.js";
import UserModel from "./userModel.js";

const sourceSchema: mongoose.Schema<sourceInterface> = new mongoose.Schema({
  name: String,
  balance: Number,
  color: String,
  icon: String,
  user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});

const SourceModel: mongoose.Model<sourceInterface> = model<sourceInterface>("Source", sourceSchema);

export default SourceModel;
