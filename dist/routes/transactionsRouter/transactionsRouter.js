import express from "express";
import authMiddlware from "@/auth/authMiddlware.js";
import getAllTransactions from "@/routes/transactionsRouter/getAllTransactions.js";
import postNewTransaction from "@/routes/transactionsRouter/postNewTransactions.js";
const transactionsRouter = express.Router();
transactionsRouter.get("/", authMiddlware, getAllTransactions);
transactionsRouter.post("/", authMiddlware, postNewTransaction);
export default transactionsRouter;
