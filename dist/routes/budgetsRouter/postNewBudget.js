"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BudgetModel_js_1 = __importDefault(require("../../models/BudgetModel.js"));
const postNewBudget = async (req, res) => {
    const newBudget = req.body;
    const SavedBudget = await new BudgetModel_js_1.default({ ...newBudget, user: req.user._id }).save();
    res.json(SavedBudget);
};
exports.default = postNewBudget;
