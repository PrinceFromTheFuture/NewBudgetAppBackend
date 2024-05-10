import dayjs from "dayjs";
import BudgetModel from "../../models/BudgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest, newActionFormInteface } from "../../types.js";

const postNewTransaction = async (req: AuthenticatedRequest, res) => {
  const { amount, budget, date, source, title, type }: newActionFormInteface = req.body;
  const decimalAmount = parseFloat(String(amount)).toFixed(2);

  const savedTransation = new TransactionModel({
    amount: decimalAmount,
    budget,
    date,
    source,
    title,
    type,
    user: req.user!._id,
  });
  await savedTransation.save();
  const now = dayjs().toString();

  const BudgetDocumnet = await BudgetModel.findOne({
    start: { $lt: now },
    end: { $gt: now },
    user: req.user!._id,
  });

  BudgetDocumnet!.categories.find((category) => category.name === budget)!.spent += amount;
  await BudgetDocumnet!.save();
  res.json(BudgetDocumnet);
};

export default postNewTransaction;