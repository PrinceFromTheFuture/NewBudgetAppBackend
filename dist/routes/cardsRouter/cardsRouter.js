import express from "express";
import authMiddlware from "../../auth/authMiddlware.js";
import getAllCards from "./getAllCards.js";
import postNewCard from "./postNewCard.js";
const cardsRouter = express.Router();
cardsRouter.get("/", authMiddlware, getAllCards);
cardsRouter.post("/", authMiddlware, postNewCard);
export default cardsRouter;
