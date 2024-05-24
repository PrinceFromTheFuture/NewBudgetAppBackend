import mongoose from "mongoose";
import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest } from "../../types.js";
import { Response } from "express";
import SourceModel from "../../models/sourceModel.js";
import CardModel from "../../models/cardModel.js";

const deleteTransaction = async (req: AuthenticatedRequest, res: Response) => {
  const transactionId = new mongoose.Types.ObjectId(req.params.id);
  const { budgets, sources }: { budgets: boolean; sources: boolean } = req.body;

  const transaction = await TransactionModel.findById(transactionId);
  if (!transaction) {
    return res.status(400).send("error couldnt find transaction to delete");
  }

  if (sources) {
    if (transaction.source) {
      const sourceDocument = await SourceModel.findById(transaction.source);
      if (sourceDocument) {
        sourceDocument.balance += transaction.amount;
        await sourceDocument.save();
      }
    }
    if (transaction.card) {
      const cardDocument = await CardModel.findById(transaction.card);
      cardDocument!.amountUsed -= transaction.amount;
      await cardDocument!.save();
    }
  }

  if (budgets) {
    const associatedBudget = await BudgetModel.findById(transaction.budget);
    if (associatedBudget) {
      associatedBudget.categories.find(
        (category) => transaction!.budgetCategory === category.name
      )!.spent -= transaction!.amount!;
      await associatedBudget.save();
    }
  }
  await transaction!.deleteOne();
  res.status(200).send("deleted");
};

export default deleteTransaction;
