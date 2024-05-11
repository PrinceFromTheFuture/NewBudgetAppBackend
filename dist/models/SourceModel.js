import mongoose, { model } from "mongoose";
const sourceSchema = new mongoose.Schema({
    name: String,
    balance: Number,
    color: String,
});
const SourceModel = model("Source", sourceSchema);
export default SourceModel;
//# sourceMappingURL=SourceModel.js.map