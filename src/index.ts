import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  const message = "Hello, world!";
  res.json({ ip: req.ip, message, url: req.url });
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`)
);
