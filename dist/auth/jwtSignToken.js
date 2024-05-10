"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSignToken = (userId) => {
    const jwtSecret = process.env.TOKETSECRET;
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret, {
        expiresIn: 60 * 60 * 24 * 5,
    });
    return token;
};
exports.default = jwtSignToken;
//# sourceMappingURL=jwtSignToken.js.map