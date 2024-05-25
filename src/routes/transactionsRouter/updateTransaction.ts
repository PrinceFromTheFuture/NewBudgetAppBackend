import mongoose from "mongoose";
import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest, Transaction } from "../../types.js";
import { Response } from "express";
import SourceModel from "../../models/sourceModel.js";

const updateTransaction = async (req: AuthenticatedRequest, res: Response) => {
  const transactionId = new mongoose.Types.ObjectId(req.params.id);
  const {
    updatedTransaction: updatedTransaction,
    options,
  }: {
    updatedTransaction: Transaction;
    options: { budgets: boolean; sources: boolean };
  } = req.body;

  const userId: string = req.user._id;

  const currentTransaction = await TransactionModel.findById(transactionId);
  if (currentTransaction) {
    if (options.budgets) {
      const transactionBudget = await BudgetModel.findOne({ user: userId });
      if (transactionBudget) {
        transactionBudget.categories.find(
          (category) => category.name === currentTransaction.budgetCategory
        )!.spent -= currentTransaction.amount!;

        transactionBudget.categories.find(
          (category) => category.name === updatedTransaction.budgetCategory
        )!.spent += Number(updatedTransaction.amount)!;

        await transactionBudget.save();
      }

      if (options.sources) {
        const currentTransactionSource = await SourceModel.findById(currentTransaction.source);
        currentTransactionSource!.balance += currentTransaction.amount;
        await currentTransactionSource!.save();

        const updatedTransactionSource = await SourceModel.findById(updatedTransaction.source);
        updatedTransactionSource!.balance += updatedTransaction.amount;
        await updatedTransactionSource!.save();
      }
    }
    if (options.sources) {
      const currentTransactionSource = await SourceModel.findById(currentTransaction.source);

      if (currentTransactionSource) {
        console.log(currentTransactionSource);
        currentTransactionSource.balance += Number(currentTransaction.amount);
        await currentTransactionSource.save();
      }
      const updatedTransactionSource = await SourceModel.findById(updatedTransaction.source);

      if (updatedTransactionSource) {
        updatedTransactionSource.balance -= Number(updatedTransaction.amount);
        await updatedTransactionSource.save();
      }
    }

    currentTransaction.title = updatedTransaction.title;
    currentTransaction.amount = updatedTransaction.amount;
    currentTransaction.budgetCategory = updatedTransaction.budgetCategory;
    currentTransaction.date = updatedTransaction.date;
    currentTransaction.source = new mongoose.Types.ObjectId(updatedTransaction.source);
    currentTransaction.type = updatedTransaction.type;
    await currentTransaction.save();
  }

  res.status(200).send("updated");
};

export default updateTransaction;
