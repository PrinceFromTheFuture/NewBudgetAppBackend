import mongoose, { model } from "mongoose";
const userSchema = new mongoose.Schema({
    budgetFrom: String,
    BudgetTo: String,
});
const UserModel = model("user", userSchema);
export default UserModel;
//# sourceMappingURL=UserModel.js.map