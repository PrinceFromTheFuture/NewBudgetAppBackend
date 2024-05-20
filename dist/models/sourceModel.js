import mongoose, { model } from "mongoose";
const sourceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    color: { type: String, required: true },
});
const SourceModel = model("Source", sourceSchema);
export default SourceModel;
