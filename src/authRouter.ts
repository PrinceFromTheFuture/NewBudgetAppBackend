import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwtSignToken from "./auth/jwtSignToken.js";
import jwt from "jsonwebtoken";
import UserModel from "./models/userModel.js";

const authRouter = express.Router();

interface User extends mongoose.Document {
  username: string;
  password: string;
}

authRouter.post("/signup", async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;
  const userSchema = new UserModel({ username, password });
  const userDocument: User = await userSchema.save();

  const token = jwtSignToken(String(userDocument._id));

  res.cookie("authToken", token, {
    maxAge: 1000 * 60 * 60 * 34 * 3,
    sameSite: "none",
    secure: true,
  });
  res.json({ username: userDocument.username });
});

authRouter.post("/signin", async (req, res) => {
  const { username, password }: { username: string; password: string } = req.body;
  const userDocument: User | null = await UserModel.findOne({ username });

  if (!userDocument) {
    res.send("erorr");
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, userDocument.password);
  if (isPasswordValid === true) {
    const token = jwtSignToken(String(userDocument._id));

    res.cookie("authToken", token, {
      maxAge: 1000 * 60 * 60 * 34 * 3,
      sameSite: "none",
      secure: true,
    });

    res.json({ username: userDocument.username });
  }
});

authRouter.get("/verifyToken", async (req, res) => {
  const jwtSecret = process.env.TOKETSECRET;
  const token: string = req.cookies.authToken;
  try {
    const decoded: { userId: string } = jwt.verify(token, jwtSecret!) as {
      userId: string;
    };
    const user = await UserModel.findById(decoded.userId);
    if (user) {
      res.json({ username: user.username });
    }
  } catch (e) {
    res.send("you are not llooged In");
  }
});

authRouter.get("/logout", async (req, res) => {
  res.status(200);
  res.clearCookie("authToken", { sameSite: "none", secure: true });
  res.send("token Removed");
});
export default authRouter;
