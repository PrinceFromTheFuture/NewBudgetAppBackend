import mongoose, { model } from "mongoose";
import SourceModel from "./sourceModel.js";
const userSchema = new mongoose.Schema({
    amountUsed: { type: Number, required: true },
    associatedSource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SourceModel,
        required: true,
    },
    ResetDay: { type: Number, required: true },
});
const UserModel = model("user", userSchema);
export default UserModel;
