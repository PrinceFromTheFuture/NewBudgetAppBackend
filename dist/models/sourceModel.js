import mongoose, { model } from "mongoose";
import UserModel from "./userModel.js";
const sourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    color: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});
const SourceModel = model("Source", sourceSchema);
export default SourceModel;
