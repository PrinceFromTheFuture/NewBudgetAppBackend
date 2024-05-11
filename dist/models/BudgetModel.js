import mongoose, { model } from "mongoose";
import { UserModel } from "./userModel.js";
const budgetSchema = new mongoose.Schema({
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
const BudgetModel = model("Budget", budgetSchema);
export default BudgetModel;
