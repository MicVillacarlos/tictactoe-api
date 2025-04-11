import express from "express";
import { config } from "./config/config";
import { connectDB } from "./db/connect";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello from TypeScript + Express!");
});

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `##### - 🚀 Server running → http://localhost:${config.port} - #####`
    );
  });
});
