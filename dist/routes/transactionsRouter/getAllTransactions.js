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
const transactionModel_js_1 = __importDefault(require("../../models/transactionModel.js"));
const getAllTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTransactions = yield transactionModel_js_1.default.find({
        user: req.user._id,
    });
    res.json(allTransactions);
});
exports.default = getAllTransactions;
//# sourceMappingURL=getAllTransactions.js.map