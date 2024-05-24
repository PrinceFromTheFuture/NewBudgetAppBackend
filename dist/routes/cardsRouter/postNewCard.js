import CardModel from "../../models/cardModel.js";
const postNewCard = async (req, res) => {
    const newCard = req.body;
    const newCardDocument = await new CardModel(newCard).save();
    res.json(newCardDocument);
};
export default postNewCard;
