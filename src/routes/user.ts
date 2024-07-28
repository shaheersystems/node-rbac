import { Router } from "express";
import { createUser, login } from "../handlers/user";

const userRouter = Router();

export default userRouter;
