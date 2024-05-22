import mongoose from "mongoose";
import BudgetModel from "../../models/budgetModel.js";
import TransactionModel from "../../models/transactionModel.js";
import SourceModel from "../../models/sourceModel.js";
const updateTransaction = async (req, res) => {
    const transactionId = new mongoose.Types.ObjectId(req.params.id);
    const { updatedTransaction: updatedTransaction, options, } = req.body;
    const userId = req.user._id;
    const currentTransaction = await TransactionModel.findById(transactionId);
    if (currentTransaction) {
        if (options.budgets) {
            const transactionBudget = await BudgetModel.findById(currentTransaction.budget);
            if (transactionBudget) {
                transactionBudget.categories.find((category) => category.name === currentTransaction.budgetCategory).spent -= currentTransaction.amount;
                transactionBudget.categories.find((category) => category.name === updatedTransaction.budgetCategory).spent += Number(updatedTransaction.amount);
                await transactionBudget.save();
            }
        }
        if (options.sources) {
            const currentTransactionSource = await SourceModel.findOne({
                user: userId,
                name: currentTransaction.source,
            });
            if (currentTransactionSource) {
                currentTransactionSource.balance += Number(currentTransaction.amount);
                await currentTransactionSource.save();
            }
            const updatedTransactionSource = await SourceModel.findOne({
                user: userId,
                name: updatedTransaction.source,
            });
            if (updatedTransactionSource) {
                updatedTransactionSource.balance -= Number(updatedTransaction.amount);
                await updatedTransactionSource.save();
            }
        }
        currentTransaction.title = updatedTransaction.title;
        currentTransaction.amount = updatedTransaction.amount;
        currentTransaction.budgetCategory = updatedTransaction.budgetCategory;
        currentTransaction.date = updatedTransaction.date;
        currentTransaction.source = updatedTransaction.source;
        currentTransaction.type = updatedTransaction.type;
        await currentTransaction.save();
    }
    res.status(200).send("updated");
};
export default updateTransaction;
