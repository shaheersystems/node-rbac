import express from "express";
import cors from "cors";
import morgan from "morgan";
import { protect } from "./middleware/auth";
import "dotenv/config";
import { createUser, login } from "./handlers/user";
import { Request as ExpressRequest, Response } from "express";
import { User } from "@prisma/client";

interface Request extends ExpressRequest {
  user?: User;
}

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Public routes
app.post("/api/login", login);
app.post("/api/register", createUser);

app.get("/api/protected", protect, (req: Request, res: Response) => {
  res.status(200).json({ message: "Protected route", user: req.user });
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
