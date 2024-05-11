import mongoose, { model } from "mongoose";
import { UserModel } from "@/models/userModel.js";
import { budgetInterface } from "@/types.js";

const budgetSchema: mongoose.Schema<budgetInterface> = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: UserModel },
  start: String,
  end: String,
  categories: [
    {
      name: String,
      spent: Number,
      scheduled: Number,
      color: String,
    },
  ],
});

const BudgetModel: mongoose.Model<budgetInterface> = model<budgetInterface>("Budget", budgetSchema);

export default BudgetModel;
