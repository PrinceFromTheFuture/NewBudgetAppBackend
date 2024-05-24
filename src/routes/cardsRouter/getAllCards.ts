import CardModel from "../../models/cardModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest } from "../../types.js";
import { Response } from "express";

const getAllCards = async (req: AuthenticatedRequest, res: Response) => {
  const allCards = await CardModel.find({
    user: req.user._id,
  });

  res.json(allCards);
};

export default getAllCards;
