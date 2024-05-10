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
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_js_1 = require("../models/userModel.js");
const jwtSignToken_js_1 = __importDefault(require("../auth/jwtSignToken.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRouter = express_1.default.Router();
authRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userSchema = new userModel_js_1.UserModel({ username, password });
    const userDocument = yield userSchema.save();
    const token = (0, jwtSignToken_js_1.default)(String(userDocument._id));
    res.cookie("authToken", token);
    res.json({ username: userDocument.username });
}));
authRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userDocument = yield userModel_js_1.UserModel.findOne({ username });
    if (!userDocument) {
        res.send("erorr");
        return;
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, userDocument.password);
    if (isPasswordValid === true) {
        const token = (0, jwtSignToken_js_1.default)(String(userDocument._id));
        res.cookie("authToken", token, { secure: true });
        res.json({ username: userDocument.username });
    }
}));
authRouter.get("/verifyToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtSecret = process.env.TOKETSECRET;
    const token = req.cookies.authToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = yield userModel_js_1.UserModel.findById(decoded.userId);
        if (user) {
            res.json({ username: user.username });
        }
    }
    catch (e) {
        res.send("you are not llooged In");
    }
}));
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map