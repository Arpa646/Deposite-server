import { Schema, model } from "mongoose"; // Added import for `model`
//import { TUser } from "./user.interface";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    userId: { type: String, required: true, unique: true },
    balance:{ type: Number, required: true, },
   

},
  {
    timestamps: true,
  }
);

export const UserRegModel = model<IUser>("TestUser", userSchema);
