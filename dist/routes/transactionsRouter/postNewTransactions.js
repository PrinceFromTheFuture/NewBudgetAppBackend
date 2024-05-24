import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import SourceModel from "../../models/sourceModel.js";
const postNewTransaction = async (req, res) => {
    const { amount, budgetCategory, date, source, title, type } = req.body;
    const decimalAmount = Number(amount);
    const BudgetDocumnet = await BudgetModel.findOne({
        user: req.user._id,
    });
    const savedTransation = new TransactionModel({
        budget: BudgetDocumnet._id,
        amount: decimalAmount,
        budgetCategory,
        date,
        source,
        title,
        type,
        user: req.user._id,
    });
    await savedTransation.save();
    const sourceDocument = await SourceModel.findOne({
        user: req.user._id,
        name: source,
    });
    if (sourceDocument) {
        sourceDocument.balance -= decimalAmount;
        await sourceDocument.save();
    }
    BudgetDocumnet.categories.find((category) => category.name === budgetCategory).spent +=
        decimalAmount;
    await BudgetDocumnet.save();
    res.json(BudgetDocumnet);
};
export default postNewTransaction;
