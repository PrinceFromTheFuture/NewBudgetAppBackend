import mongoose, { model } from "mongoose";
import { UserModel } from "@/models/userModel.js";
const transactionSchema = new mongoose.Schema({
    title: String,
    type: String,
    date: String,
    amount: Number,
    budget: String,
    source: String,
    user: { type: mongoose.Schema.ObjectId, ref: UserModel },
});
const TransactionModel = model("Transaction", transactionSchema);
export default TransactionModel;
