import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
const authMiddlware = async (req, res, next) => {
    const jwtSecret = process.env.TOKETSECRET;
    const token = req.cookies.authToken;
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decoded.userId);
        if (user) {
            req.user = user;
        }
        next();
    }
    catch (e) {
        res.send("you are not llooged In");
    }
};
export default authMiddlware;
