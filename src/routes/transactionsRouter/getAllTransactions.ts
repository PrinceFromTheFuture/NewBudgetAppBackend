import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest } from "../../types.js";
import { Response } from "express";

const getAllTransactions = async (req: AuthenticatedRequest, res: Response) => {
  const allTransactions = await TransactionModel.find({
    user: req.user!._id,
  });
  res.json(allTransactions);
};

export default getAllTransactions;
