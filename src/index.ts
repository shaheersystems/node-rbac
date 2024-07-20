import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes";
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  const message = "Hello, world!";
  res.json({ ip: req.ip, message, url: req.url });
});

app.use("/api/user", userRouter);

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000`)
);
