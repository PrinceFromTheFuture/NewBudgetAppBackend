import mongoose from "mongoose";
import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import SourceModel from "../../models/sourceModel.js";
const deleteTransaction = async (req, res) => {
    const transactionId = new mongoose.Types.ObjectId(req.params.id);
    const { budgets, sources } = req.body;
    const transaction = await TransactionModel.findById(transactionId);
    if (!transaction) {
        return res.status(400).send("error couldnt find transaction to delete");
    }
    if (sources) {
        const sourceDocument = await SourceModel.findOne({
            user: req.user._id,
            name: transaction.source,
        });
        if (sourceDocument) {
            sourceDocument.balance += transaction.amount;
            await sourceDocument.save();
        }
    }
    if (budgets) {
        const associatedBudget = await BudgetModel.findById(transaction.budget);
        if (associatedBudget) {
            associatedBudget.categories.find((category) => transaction.budgetCategory === category.name).spent -= transaction.amount;
            await associatedBudget.save();
        }
    }
    await transaction.deleteOne();
    res.status(200).send("deleted");
};
export default deleteTransaction;
