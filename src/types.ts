import mongoose from "mongoose";
import { User } from "./models/userModel.js";
import { Request } from "express";

export interface Transaction {
  title: string;
  source: string;
  budgetCategory: string;
  amount: number;
  date: string;
  type: string;
  user: string | mongoose.Types.ObjectId;
  budget: string | mongoose.Types.ObjectId;
}

export interface Card {
  amountUsed: number;
  limit: number;
  name: string;
  associatedSource: string | mongoose.Schema.Types.ObjectId;
  user: string | mongoose.Schema.Types.ObjectId;
  resetDay: number;
}

export type CardDocument = mongoose.Document & Card;

export interface sourceInterface {
  name: string;
  balance: number;
  color: string;
  icon: string;
  user: string | mongoose.Types.ObjectId;
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
