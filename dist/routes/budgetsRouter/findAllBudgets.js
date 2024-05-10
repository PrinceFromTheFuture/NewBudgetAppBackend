"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BudgetModel_js_1 = __importDefault(require("../../models/BudgetModel.js"));
const findAllBudgets = async (req, res) => {
    const allBusgets = await BudgetModel_js_1.default.find({ user: req.user._id });
    res.json(allBusgets);
};
exports.default = findAllBudgets;
//# sourceMappingURL=findAllBudgets.js.map