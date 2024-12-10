import mongoose, { Schema } from "mongoose";

interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: IUserRole;
}

type IUserRole = "doctor" | "nurse" | "patient";

const UserSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "nurse", "patient"], required: true },
});

// compare the user password
UserSchema.methods.comparePassword = async function (password: string) {
  return password === this.password;
}
const User = mongoose.model<IUser>("User", UserSchema);



export { IUser, IUserRole, User };
