import express from "express";
import { userControllers } from "./user.controller";


const router = express.Router();

router.post(
  "/create-user",

  userControllers.createUser
);
router.get("/", userControllers.getAllUser);

router.put("/add-balance", userControllers.addBalance);

router.put("/transfer-balance", userControllers.transferBalance);

export const UserRoutes = router;
