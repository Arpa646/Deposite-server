import { StatusCodes } from "http-status-codes";
import { UserRegModel } from "./user.model";
import sendResponse from "../../../utils/response";
import { Request, Response, NextFunction } from "express";
import { UserServices } from "./user.service";
const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Taking name from body
      const { name, userId } = req.body;
  
      console.log(name,userId)
      // prepare data for post in database with initial balace=0
      const newUserData = {
        userId,
        name,
        balance: 0, // Default balance is 0
      };
  
      // Save the user to the database
      //pass data to userservices for saving data 
      const result = await UserServices.createUserIntoDB(newUserData);
  
      // Send a success response
      sendResponse(res, {
        statusCode: StatusCodes.CREATED, 
        success: true,
        message: "User created successfully",
        data: result,
      });
    } catch (error) {
      // Handling error
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Failed to create user",
        error: (error as Error).message || "Something went wrong",
  
      });
    }
  };


  const getAllUser = async (req: Request, res: Response) => {
    try {
      const result = await UserServices.getAllUserFromDB();
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Data Found",
          data: [],
        });
      }
  
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving users",
        error: error.message,
      });
    }
  };
  

  const addBalance = async (req: Request, res: Response) => {
    try {
      // Extract `id` (userId) and `deposit` from the request body
      const { userId, deposit } = req.body;
  
      // Check if the user exists
      const user = await UserRegModel.findOne({ userId: userId });
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({
          success: false,
          message: `User with ID ${userId} not found`,
        });
      }
  
      // Update the user's balance by adding the deposit
      user.balance += deposit;
      const updatedUser = await user.save();
  
      // Send a success response with the updated user data
      res.status(StatusCodes.OK).send({
        success: true,
        message: "Balance updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      // Handle errors explicitly
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Failed to update balance",
        error: (error as Error).message || "Something went wrong",
  
      });
    }
  };


  const transferBalance = async (req: Request, res: Response) => {
    try {
      const { senderId, receiverId, amount } = req.body;
  
      // Validate request body
      if (!senderId || !receiverId || !amount || amount <= 0) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          success: false,
          message: "Invalid input. Please provide valid senderId, receiverId, and amount.",
        });
      }
  
      // Fetch sender and receiver details from the database
      const sender = await UserRegModel.findOne({ userId: senderId });
      const receiver = await UserRegModel.findOne({ userId: receiverId });
  
      if (!sender || !receiver) {
        return res.status(StatusCodes.NOT_FOUND).send({
          success: false,
          message: "Sender or Receiver not found!",
        });
      }
  
      // Check if the sender has sufficient balance
      if (sender.balance < amount) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          success: false,
          message: "Insufficient balance!",
        });
      }
  
      // Update balances
      sender.balance -= amount;
      receiver.balance += amount;
  
      // Save the updated user data
      await sender.save();
      await receiver.save();
  
      // Send success response
      res.status(StatusCodes.OK).send({
        success: true,
        message: "Balance transferred successfully!",
        data: {
          sender: {
            userId: sender.userId,
            name: sender.name,
            balance: sender.balance,
          },
          receiver: {
            userId: receiver.userId,
            name: receiver.name,
            balance: receiver.balance,
          },
        },
      });
    } catch (error) {
      // Handle errors explicitly
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Failed to transfer balance",
        error: (error as Error).message || "Something went wrong",
  
      });
    }
  };



  export const userControllers = {
    createUser,
    getAllUser,
    addBalance,
    transferBalance
};
  