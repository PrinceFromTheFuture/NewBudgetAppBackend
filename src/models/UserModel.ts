import mongoose, { model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema: mongoose.Schema<User> = new mongoose.Schema({
  username: String,
  password: String,
});

userSchema.pre<User>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
});
const UserModel: mongoose.Model<User> = model<User>("user", userSchema);
export default UserModel;
