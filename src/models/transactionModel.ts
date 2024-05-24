import mongoose, { model } from "mongoose";
import UserModel from "./userModel.js";
import BudgetModel from "./budgetModel.js";
import CardModel from "./cardModel.js";
import SourceModel from "./sourceModel.js";

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  budgetCategory: { type: String, required: true },
  source: { type: mongoose.Schema.ObjectId, ref: SourceModel, required: false },
  card: { type: mongoose.Schema.ObjectId, ref: CardModel, required: false },
  budget: { type: mongoose.Schema.ObjectId, ref: BudgetModel, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: UserModel, required: true },
});

const TransactionModel = model("Transaction", transactionSchema);

export default TransactionModel;
