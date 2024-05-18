import express from "express";
import authMiddlware from "../../auth/authMiddlware.js";
import getAllTransactions from "./getAllTransactions.js";
import postNewTransaction from "./postNewTransactions.js";
import deleteTransaction from "./deleteTransaction.js";
import updateTransaction from "./upddateTransaction.js";
const transactionsRouter = express.Router();
transactionsRouter.get("/", authMiddlware, getAllTransactions);
transactionsRouter.post("/", authMiddlware, postNewTransaction);
transactionsRouter.post("/delete/:id", authMiddlware, deleteTransaction);
transactionsRouter.patch("/:id", authMiddlware, updateTransaction);
export default transactionsRouter;
