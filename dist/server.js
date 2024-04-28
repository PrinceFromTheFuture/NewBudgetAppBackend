import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import TransactionModel from "./models/transactionModel.js";
import SourceModel from "./models/SourceModel.js";
import BudgetModel from "./models/BudgetModel.js";
configDotenv();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const port = process.env.PORT || 3000;
const mongoConnectionString = process.env.MONGOUSER;
const initilizeServer = async () => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
    if (!mongoConnectionString) {
        console.log("configure DB env connection string");
    }
    else {
        await mongoose.connect(mongoConnectionString);
        console.log("connected to DB");
    }
};
initilizeServer();
app.get("/", (req, res) => {
    res.send("BudgetApp backend");
});
app.get("/transactions", async (req, res) => {
    const allTransactions = await TransactionModel.find();
    res.json(allTransactions);
});
app.get("/transactions/delete", async (req, res) => {
    await TransactionModel.deleteMany();
    res.send("deleted");
});
app.post("/transactions", async (req, res) => {
    const { amount, budget, date, source, title, type } = req.body;
    const decimalAmount = parseFloat(String(amount)).toFixed(2);
    const savedTransation = await new TransactionModel({
        amount: decimalAmount,
        budget,
        date,
        source,
        title,
        type,
    }).save();
    const transactionBudget = await BudgetModel.findOne({ name: budget });
    if (transactionBudget) {
        console.log(transactionBudget);
        transactionBudget.spent += Number(decimalAmount);
        await transactionBudget.save();
    }
    res.json(savedTransation);
});
app.delete("/transactions", async (req, res) => {
    await TransactionModel.deleteMany();
    res.send("all transations delted");
});
app.post("/sources", async (req, res) => {
    const newSource = req.body;
    const savedTransation = await new SourceModel(newSource).save();
    res.json(savedTransation);
});
app.get("/sources", async (req, res) => {
    const allSources = await SourceModel.find();
    res.json(allSources);
});
app.get("/budgets", async (req, res) => {
    const allBusgets = await BudgetModel.find();
    res.json(allBusgets);
});
app.post("/budgets", async (req, res) => {
    const newBudget = req.body;
    const SavedBudget = await new BudgetModel(newBudget).save();
    res.json(SavedBudget);
});
//# sourceMappingURL=server.js.map