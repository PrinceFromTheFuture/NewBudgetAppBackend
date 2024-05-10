"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddlware_js_1 = __importDefault(require("../../auth/authMiddlware.js"));
const getAllTransactions_js_1 = __importDefault(require("./getAllTransactions.js"));
const postNewTransactions_js_1 = __importDefault(require("./postNewTransactions.js"));
const transactionsRouter = express_1.default.Router();
transactionsRouter.get("/", authMiddlware_js_1.default, getAllTransactions_js_1.default);
transactionsRouter.post("/", authMiddlware_js_1.default, postNewTransactions_js_1.default);
exports.default = transactionsRouter;
//# sourceMappingURL=transactionsRouter.js.map