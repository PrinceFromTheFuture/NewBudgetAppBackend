import mongoose, { model } from "mongoose";
import UserModel from "./userModel.js";
const transactionSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    budgetCategory: { type: String, required: true },
    source: { type: String, required: true },
    budget: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});
const TransactionModel = model("Transaction", transactionSchema);
export default TransactionModel;
