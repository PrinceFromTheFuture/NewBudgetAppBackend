"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transactionModel_js_1 = __importDefault(require("../../models/transactionModel.js"));
const getAllTransactions = async (req, res) => {
    const allTransactions = await transactionModel_js_1.default.find({
        user: req.user._id,
    });
    res.json(allTransactions);
};
exports.default = getAllTransactions;
//# sourceMappingURL=getAllTransactions.js.map