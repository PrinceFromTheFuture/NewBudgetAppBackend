import mongoose, { model, Document } from "mongoose";
import SourceModel from "./sourceModel.js";

export interface Card extends Document {
  amountUsed: number;
  associatedSource: string | mongoose.Schema.Types.ObjectId;
  ResetDay: number;
}

const userSchema: mongoose.Schema<Card> = new mongoose.Schema({
  amountUsed: { type: Number, required: true },
  associatedSource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: SourceModel,
    required: true,
  },
  ResetDay: { type: Number, required: true },
});

const UserModel: mongoose.Model<Card> = model<Card>("user", userSchema);

export default UserModel;
