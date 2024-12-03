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


  export const userControllers = {
    createUser
};
  