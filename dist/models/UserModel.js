import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
});
const UserModel = model("user", userSchema);
export default UserModel;
