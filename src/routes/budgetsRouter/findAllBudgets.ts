import BudgetModel from "../../models/BudgetModel.js";
import { Response } from "express";
import { AuthenticatedRequest } from "../../types.js";

const findAllBudgets = async (req: AuthenticatedRequest, res: Response) => {
  const allBusgets = await BudgetModel.find({ user: req.user._id });
  res.json(allBusgets);
};

export default findAllBudgets;
