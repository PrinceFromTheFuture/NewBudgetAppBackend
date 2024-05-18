import mongoose from "mongoose";
import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest } from "../../types.js";
import { Response } from "express";

const deleteTransaction = async (req: AuthenticatedRequest, res: Response) => {
  const transactionId = new mongoose.Types.ObjectId(req.params.id);
  const { budgets, sources }: { budgets: boolean; sources: boolean } = req.body;

  const userId: string = req.user._id;

  const transaction = await TransactionModel.findById(transactionId);
  if (budgets) {
    const associatedBudget = await BudgetModel.findOne({ user: userId });
    if (associatedBudget) {
      associatedBudget.categories.find(
        (category) => transaction!.budgetCategory === category.name
      )!.spent += transaction!.amount!;
      await associatedBudget.save();
    }
  }
  await transaction!.deleteOne();
  res.status(200).send("deleted");
};

export default deleteTransaction;
