


import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { UserRegModel } from "./user.model";

const createUserIntoDB = async (userData: IUser) => {
    try {
      // Check if user already exists
      const existingUser = await UserRegModel.findOne({ userId: userData.userId });
      if (existingUser) {
        throw new Error("User with this userId already exists");
      }
  
      // Create a new user
      const newUser = await UserRegModel.create(userData);
  
      return newUser;
    } catch (err: any) {
      throw new Error(err.message || "Failed to create user");
    }
  };

  
export const UserServices = {
    createUserIntoDB
 
    
  };