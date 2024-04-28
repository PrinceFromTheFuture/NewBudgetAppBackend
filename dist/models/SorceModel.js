import mongoose, { model } from "mongoose";
const sourceSchema = new mongoose.Schema({
    title: String,
    type: String,
    date: String,
    amount: String,
    budget: String,
    source: String,
});
const SorceModel = model("Source", sourceSchema);
export default SorceModel;
//# sourceMappingURL=SorceModel.js.map