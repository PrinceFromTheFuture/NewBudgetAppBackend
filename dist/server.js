import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import SourceModel from "./models/sourceModel.js";
import cookieParser from "cookie-parser";
import transactionsRouter from "./routes/transactionsRouter/transactionsRouter.js";
import budgetsRouter from "./routes/budgetsRouter/budgetsRouter.js";
import authRouter from "./authRouter.js";
const app = express();
//Enabling CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `${process.env.FRONTEND}`); // Change this to match your frontend origin
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(express.urlencoded({ extended: false }));
configDotenv();
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRouter);
app.use("/transactions", transactionsRouter);
app.use("/budgets", budgetsRouter);
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
app.post("/sources", async (req, res) => {
    const newSource = req.body;
    const savedTransation = await new SourceModel(newSource).save();
    res.json(savedTransation);
});
app.get("/sources", async (req, res) => {
    const allSources = await SourceModel.find();
    res.json(allSources);
});
