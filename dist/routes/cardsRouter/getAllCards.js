import CardModel from "../../models/cardModel.js";
const getAllCards = async (req, res) => {
    const allCards = await CardModel.find({
        user: req.user._id,
    });
    res.json(allCards);
};
export default getAllCards;
