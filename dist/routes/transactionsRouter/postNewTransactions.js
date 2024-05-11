import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
const postNewTransaction = async (req, res) => {
    const { amount, budget, date, source, title, type } = req.body;
    const decimalAmount = Number(amount);
    const savedTransation = new TransactionModel({
        amount: decimalAmount,
        budget,
        date,
        source,
        title,
        type,
        user: req.user._id,
    });
    await savedTransation.save();
    const BudgetDocumnet = await BudgetModel.findOne({
        user: req.user._id,
    });
    BudgetDocumnet.categories.find((category) => category.name === budget).spent += decimalAmount;
    await BudgetDocumnet.save();
    console.log(BudgetDocumnet);
    res.json(BudgetDocumnet);
};
export default postNewTransaction;
