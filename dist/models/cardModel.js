import mongoose, { model } from "mongoose";
import SourceModel from "./sourceModel.js";
import UserModel from "./userModel.js";
const cardSchema = new mongoose.Schema({
    amountUsed: { type: Number, required: true },
    name: { type: String, required: true },
    limit: { type: Number, required: true },
    associatedSource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: SourceModel,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    resetDay: { type: Number, required: true },
});
const CardModel = model("card", cardSchema);
export default CardModel;
