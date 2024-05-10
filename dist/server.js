"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = require("dotenv");
const SourceModel_js_1 = __importDefault(require("./models/SourceModel.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRouter_js_1 = __importDefault(require("./routes/authRouter.js"));
const transactionsRouter_js_1 = __importDefault(require("./routes/transactionsRouter/transactionsRouter.js"));
const budgetsRouter_js_1 = __importDefault(require("./routes/budgetsRouter/budgetsRouter.js"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:5173", "https://newbudgetappfrontend.onrender.com/"], // Replace with your frontend
    credentials: true, // Allow credentials
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
(0, dotenv_1.configDotenv)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRouter_js_1.default);
app.use("/transactions", transactionsRouter_js_1.default);
app.use("/budgets", budgetsRouter_js_1.default);
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
        await mongoose_1.default.connect(mongoConnectionString);
        console.log("connected to DB");
    }
};
initilizeServer();
app.get("/", (req, res) => {
    res.send("BudgetApp backend");
});
app.post("/sources", async (req, res) => {
    const newSource = req.body;
    const savedTransation = await new SourceModel_js_1.default(newSource).save();
    res.json(savedTransation);
});
app.get("/sources", async (req, res) => {
    const allSources = await SourceModel_js_1.default.find();
    res.json(allSources);
});
//# sourceMappingURL=server.js.map