import express from "express";
import jwtSignToken from "./auth/jwtSignToken.js";
import jwt from "jsonwebtoken";
import UserModel from "./models/userModel.js";
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    const userSchema = new UserModel({ username, password });
    const userDocument = await userSchema.save();
    const token = jwtSignToken(String(userDocument._id));
    res.cookie("authToken", token);
    res.json({ username: userDocument.username });
});
authRouter.post("/singin", async (req, res) => {
    res.send("hi");
});
authRouter.get("/verifyToken", async (req, res) => {
    const jwtSecret = process.env.TOKETSECRET;
    const token = req.cookies.authToken;
    try {
        const decoded = jwt.verify(token, jwtSecret);
        const user = await UserModel.findById(decoded.userId);
        if (user) {
            res.json({ username: user.username });
        }
    }
    catch (e) {
        res.send("you are not llooged In");
    }
});
export default authRouter;
