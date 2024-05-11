"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const BudgetModel_js_1 = __importDefault(require("../../models/BudgetModel.js"));
const transactionModel_js_1 = __importDefault(require("../../models/transactionModel.js"));
const postNewTransaction = async (req, res) => {
    const { amount, budget, date, source, title, type } = req.body;
    const decimalAmount = Number(amount);
    const savedTransation = new transactionModel_js_1.default({
        amount: decimalAmount,
        budget,
        date,
        source,
        title,
        type,
        user: req.user._id,
    });
    await savedTransation.save();
    const now = (0, dayjs_1.default)().toString();
    const BudgetDocumnet = await BudgetModel_js_1.default.findOne({
        start: { $lt: now },
        end: { $gt: now },
        user: req.user._id,
    });
    BudgetDocumnet.categories.find((category) => category.name === budget).spent += decimalAmount;
    await BudgetDocumnet.save();
    res.json(BudgetDocumnet);
};
exports.default = postNewTransaction;
