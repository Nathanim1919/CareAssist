import mongoose, { Schema } from "mongoose";
// compare the user password
import bcrypt from "bcrypt";

interface IUser extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  role: IUserRole;
  comparePassword: (password: string) => boolean;
}

type IUserRole = "doctor" | "nurse" | "patient";

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "nurse", "patient"], required: true },
});


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip if password isn't modified
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  const match = await bcrypt.compare(password, this.password);
  return match;
};


const User = mongoose.model<IUser>("User", UserSchema);



export { IUser, IUserRole, User };
