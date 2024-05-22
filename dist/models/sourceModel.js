import mongoose, { model } from "mongoose";
import UserModel from "./userModel.js";
const sourceSchema = new mongoose.Schema({
    name: String,
    balance: Number,
    color: String,
    icon: String,
    user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});
const SourceModel = model("Source", sourceSchema);
export default SourceModel;
