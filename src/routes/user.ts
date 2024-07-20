import { Router } from "express";
import { prisma } from "../config";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.json({
      length: users.length,
      data: users,
      error: null,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      data: null,
      error: error.message,
      success: false,
    });
  }
});

export default userRouter;
