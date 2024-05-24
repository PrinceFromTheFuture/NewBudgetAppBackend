import CardModel from "../../models/cardModel.js";
import TransactionModel from "../../models/transactionModel.js";
import { AuthenticatedRequest, Card } from "../../types.js";
import { Response } from "express";

const postNewCard = async (req: AuthenticatedRequest, res: Response) => {
  const newCard: Card = req.body;
  const newCardDocument = await new CardModel(newCard).save();
  res.json(newCardDocument);
};

export default postNewCard;
