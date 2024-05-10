"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const BudgetModel_js_1 = __importDefault(require("../../models/BudgetModel.js"));
const transactionModel_js_1 = __importDefault(require("../../models/transactionModel.js"));
const postNewTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield savedTransation.save();
    const now = (0, dayjs_1.default)().toString();
    const BudgetDocumnet = yield BudgetModel_js_1.default.findOne({
        start: { $lt: now },
        end: { $gt: now },
        user: req.user._id,
    });
    BudgetDocumnet.categories.find((category) => category.name === budget).spent += decimalAmount;
    yield BudgetDocumnet.save();
    res.json(BudgetDocumnet);
});
exports.default = postNewTransaction;
//# sourceMappingURL=postNewTransactions.js.map