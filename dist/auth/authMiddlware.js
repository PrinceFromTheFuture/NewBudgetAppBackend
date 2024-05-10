"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_js_1 = require("../models/userModel.js");
const authMiddlware = async (req, res, next) => {
    const jwtSecret = process.env.TOKETSECRET;
    const token = req.cookies.authToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = await userModel_js_1.UserModel.findById(decoded.userId);
        if (user) {
            req.user = user;
        }
        next();
    }
    catch (e) {
        res.send("you are not llooged In");
    }
};
exports.default = authMiddlware;
//# sourceMappingURL=authMiddlware.js.map