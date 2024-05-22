import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest, Transaction } from "../../types.js";
import { Response } from "express";

const postNewTransaction = async (req: AuthenticatedRequest, res: Response) => {
  const { amount, budgetCategory, date, source, title, type }: Transaction = req.body;
  const decimalAmount = Number(amount);

  const savedTransation = new TransactionModel({
    amount: decimalAmount,
    budgetCategory,
    date,
    source,
    title,
    type,
    user: req.user._id,
  });
  await savedTransation.save();

  const BudgetDocumnet = await BudgetModel.findOne({
    user: req.user._id,
  });

  BudgetDocumnet!.categories.find((category) => category.name === budgetCategory)!.spent +=
    decimalAmount;
  await BudgetDocumnet!.save();
  console.log(BudgetDocumnet);
  res.json(BudgetDocumnet);
};

export default postNewTransaction;
