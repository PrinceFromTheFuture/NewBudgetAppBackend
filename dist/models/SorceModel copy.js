import mongoose, { model } from "mongoose";
const transactionSchema = new mongoose.Schema({
    title: String,
    type: String,
    date: String,
    amount: String,
    budget: String,
    source: String,
});
const TransactionModel = model("Transaction", transactionSchema);
export default TransactionModel;
//# sourceMappingURL=SorceModel%20copy.js.map