import mongoose, { model } from "mongoose";
import UserModel, { User } from "./userModel.js";

export interface BudgetCategory {
  name: string;
  spent: number;
  scheduled: number;
  color: string;
}

interface budgetSchemaInterface {
  user: string | User;
  start: string;
  end: string;
  categories: BudgetCategory[];
}

const budgetSchema: mongoose.Schema<budgetSchemaInterface> =
  new mongoose.Schema({
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

const BudgetModel: mongoose.Model<budgetSchemaInterface> =
  model<budgetSchemaInterface>("Budget", budgetSchema);

export default BudgetModel;
