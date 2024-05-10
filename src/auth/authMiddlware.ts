import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel, User } from "../models/userModel.js";

interface AuthenticatedRequest extends Request {
  user?: User; // This ensures that 'user' property exists on the Request object
}

const authMiddlware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const jwtSecret = process.env.TOKETSECRET;
  const token: string = req.cookies.authToken;
  try {
    const decoded: { userId: string } = jwt.verify(token, jwtSecret!) as {
      userId: string;
    };
    const user = await UserModel.findById(decoded.userId);
    if (user) {
      req.user = user;
    }

    next();
  } catch (e) {
    res.send("you are not llooged In");
  }
};

export default authMiddlware;
