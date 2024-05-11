import express from "express";
import authMiddlware from "@/auth/authMiddlware.js";
import findAllBudgets from "@/routes/budgetsRouter/findAllBudgets.js";
import postNewBudget from "@/routes/budgetsRouter/postNewBudget.js";
const budgetsRouter = express.Router();
budgetsRouter.get("/", authMiddlware, findAllBudgets);
budgetsRouter.post("/", authMiddlware, postNewBudget);
export default budgetsRouter;
