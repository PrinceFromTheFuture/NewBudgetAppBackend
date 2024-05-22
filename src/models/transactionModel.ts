import mongoose, { model } from "mongoose";
import UserModel from "./userModel.js";
import BudgetModel from "./budgetModel.js";
import { Transaction } from "../types.js";

const transactionSchema: mongoose.Schema<Transaction> = new mongoose.Schema({
  title: String,
  type: String,
  date: String,
  amount: Number,
  budgetCategory: String,
  source: String,
  budget: { type: mongoose.Schema.ObjectId, ref: BudgetModel },
=======
const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  budgetCategory: { type: String, required: true },
  source: { type: String, required: true },
  budget: { type: String, required: true },
>>>>>>> 0e643e7f9863d517e517fe91bbf4eac9a5b5f3ad
  user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});

const TransactionModel = model("Transaction", transactionSchema);

export default TransactionModel;
