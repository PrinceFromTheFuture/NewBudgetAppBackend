import TransactionModel from "../../models/transactionModel.js";
const getAllTransactions = async (req, res) => {
    const allTransactions = await TransactionModel.find({
        user: req.user._id,
    });
    res.json(allTransactions);
};
export default getAllTransactions;
