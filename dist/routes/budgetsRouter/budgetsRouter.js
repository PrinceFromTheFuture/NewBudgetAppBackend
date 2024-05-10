import express from "express";
import authMiddlware from "../../auth/authMiddlware.js";
import findAllBudgets from "./findAllBudgets.js";
import postNewBudget from "./postNewBudget.js";
const budgetsRouter = express.Router();
budgetsRouter.get("/", authMiddlware, findAllBudgets);
budgetsRouter.post("/", authMiddlware, postNewBudget);
export default budgetsRouter;
//# sourceMappingURL=budgetsRouter.js.map