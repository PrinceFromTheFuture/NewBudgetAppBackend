import express from "express";
import authMiddlware from "../../auth/authMiddlware.js";
import getAllTransactions from "./getAllTransactions.js";
import postNewTransaction from "./postNewTransactions.js";
const transactionsRouter = express.Router();
transactionsRouter.get("/", authMiddlware, getAllTransactions);
transactionsRouter.post("/", authMiddlware, postNewTransaction);
export default transactionsRouter;
