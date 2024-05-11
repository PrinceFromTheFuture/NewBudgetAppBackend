import express from "express";
import bcrypt from "bcrypt";
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
authRouter.post("/signintest", async (req, res) => {
    const { username, password } = req.body;
    const userDocument = await UserModel.findOne({ username });
    console.log(req.body);
    if (!userDocument) {
        res.send("erorr");
        return;
    }
    console.log(req.body);
    const isPasswordValid = await bcrypt.compare(password, userDocument.password);
    if (isPasswordValid === true) {
        const token = jwtSignToken(String(userDocument._id));
        console.log(req.body);
        res.cookie("authToken", token);
        console.log(req.body);
        res.json({ username: userDocument.username });
        console.log(req.body);
    }
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
