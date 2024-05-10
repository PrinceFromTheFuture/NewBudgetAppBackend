import BudgetModel from "../../models/BudgetModel.js";
const findAllBudgets = async (req, res) => {
    const allBusgets = await BudgetModel.find({ user: req.user._id });
    res.json(allBusgets);
};
export default findAllBudgets;
//# sourceMappingURL=findAllBudgets.js.map