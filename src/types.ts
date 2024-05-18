import { User } from "./models/userModel.js";
import { Request } from "express";

export interface newActionFormInteface {
  title: string;
  source: string;
  budgetCategory: string;
  amount: number;
  date: string;
  username?: string;
  type: string;
}

export interface sourceInterface {
  name: string;
  balance: number;
  color: string;
  icon: string;
}
export interface BudgetCategory {
  name: string;
  spent: number;
  scheduled: number;
  color: string;
}

export interface budgetInterface {
  user?: string | User;
  start: string;
  end: string;
  categories: BudgetCategory[];
}
export interface AuthenticatedRequest extends Request {
  user: User; // This ensures that 'user' property exists on the Request object
}
