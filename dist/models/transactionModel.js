import mongoose, { model } from "mongoose";
import UserModel from "./userModel.js";
import BudgetModel from "./budgetModel.js";
const transactionSchema = new mongoose.Schema({
    title: String,
    type: String,
    date: String,
    amount: Number,
    budgetCategory: String,
    source: String,
    budget: { type: mongoose.Schema.ObjectId, ref: BudgetModel },
    user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});
const TransactionModel = model("Transaction", transactionSchema);
export default TransactionModel;
