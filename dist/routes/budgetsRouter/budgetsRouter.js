"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddlware_js_1 = __importDefault(require("../../auth/authMiddlware.js"));
const findAllBudgets_js_1 = __importDefault(require("./findAllBudgets.js"));
const postNewBudget_js_1 = __importDefault(require("./postNewBudget.js"));
const budgetsRouter = express_1.default.Router();
budgetsRouter.get("/", authMiddlware_js_1.default, findAllBudgets_js_1.default);
budgetsRouter.post("/", authMiddlware_js_1.default, postNewBudget_js_1.default);
exports.default = budgetsRouter;
