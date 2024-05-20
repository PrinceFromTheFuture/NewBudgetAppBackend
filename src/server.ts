import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { sourceInterface } from "./types.js";
import SourceModel from "./models/sourceModel.js";
import cookieParser from "cookie-parser";
import transactionsRouter from "./routes/transactionsRouter/transactionsRouter.js";
import budgetsRouter from "./routes/budgetsRouter/budgetsRouter.js";
import authRouter from "./authRouter.js";
import TransactionModel from "./models/transactionModel.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

configDotenv();

const app = express();

const frontendIp = process.env.FRONTEND;
const corsOptions = {
  origin: frontendIp,
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/transactions", transactionsRouter);
app.use("/budgets", budgetsRouter);

dayjs.extend(utc);

const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.MONGOUSER;
const initilizeServer = async () => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
  if (!mongoConnectionString) {
    console.log("configure DB env connection string");
  } else {
    await mongoose.connect(mongoConnectionString);
    console.log("connected to DB");
  }
};

initilizeServer();

app.get("/", (req, res) => {
  res.send("BudgetApp backend");
});

app.post("/sources", async (req, res) => {
  const newSource: sourceInterface = req.body;
  const savedTransation = await new SourceModel(newSource).save();
  res.json(savedTransation);
});
app.get("/sources", async (req, res) => {
  const allSources = await SourceModel.find();
  res.json(allSources);
});
