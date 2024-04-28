import mongoose, { model } from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: String,
  type: String,
  date: String,
  amount: Number,
  budget: String,
  source: String,
});

const TransactionModel = model("Transaction", transactionSchema);

export default TransactionModel;
