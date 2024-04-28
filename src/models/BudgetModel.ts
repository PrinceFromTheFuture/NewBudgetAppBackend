import mongoose, { model } from "mongoose";

const budgetSchema = new mongoose.Schema({
  name: String,
  spent: Number,
  scheduled: Number,
  color: String,
});

const BudgetModel = model("Budget", budgetSchema);

export default BudgetModel;
