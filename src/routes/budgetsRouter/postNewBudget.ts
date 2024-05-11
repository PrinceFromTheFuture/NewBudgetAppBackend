import { Response } from "express";
import { AuthenticatedRequest, budgetInterface } from "@/types.js";
import BudgetModel from "@/models/BudgetModel.js";

const postNewBudget = async (req: AuthenticatedRequest, res: Response) => {
  const newBudget: budgetInterface = req.body;
  const SavedBudget = await new BudgetModel({ ...newBudget, user: req.user._id }).save();
  res.json(SavedBudget);
};

export default postNewBudget;
