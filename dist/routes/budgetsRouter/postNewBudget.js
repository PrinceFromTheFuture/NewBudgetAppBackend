import BudgetModel from "../../models/BudgetModel.js";
const postNewBudget = async (req, res) => {
    const newBudget = req.body;
    const SavedBudget = await new BudgetModel({ ...newBudget, user: req.user._id }).save();
    res.json(SavedBudget);
};
export default postNewBudget;
//# sourceMappingURL=postNewBudget.js.map