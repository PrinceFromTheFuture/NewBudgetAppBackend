import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest, Transaction } from "../../types.js";
import { Response } from "express";
import SourceModel from "../../models/sourceModel.js";
import CardModel from "../../models/cardModel.js";

const postNewTransaction = async (req: AuthenticatedRequest, res: Response) => {
  const { amount, budgetCategory, date, source, title, type, card }: Transaction = req.body;
  const decimalAmount = Number(amount);

  const BudgetDocumnet = await BudgetModel.findOne({
    user: req.user._id,
  });
  const sourceDocument = await SourceModel.findById(source);
  if (sourceDocument) {
    sourceDocument.balance -= decimalAmount;
    await sourceDocument.save();
  }
  const cardDocument = await CardModel.findById(card);
  if (cardDocument) {
    cardDocument.amountUsed += decimalAmount;
    await cardDocument.save();
  }

  BudgetDocumnet!.categories.find((category) => category.name === budgetCategory)!.spent +=
    decimalAmount;
  await BudgetDocumnet!.save();
  const savedTransation = new TransactionModel({
    budget: BudgetDocumnet!._id,
    card,
    amount: decimalAmount,
    budgetCategory,
    date,
    source,
    title,
    type,
    user: req.user._id,
  });
  await savedTransation.save();
  res.json(BudgetDocumnet);
};

export default postNewTransaction;
