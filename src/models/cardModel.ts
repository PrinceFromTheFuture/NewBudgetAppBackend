import mongoose, { model, Document } from "mongoose";
import SourceModel from "./sourceModel.js";
import UserModel from "./userModel.js";
import { CardDocument } from "../types.js";

const cardSchema: mongoose.Schema<CardDocument> = new mongoose.Schema({
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

const CardModel: mongoose.Model<CardDocument> = model<CardDocument>(
  "card",
  cardSchema
);

export default CardModel;
