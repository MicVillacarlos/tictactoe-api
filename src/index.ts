import express from "express";
import "reflect-metadata";
import cors from "cors";
import { config } from "./config/config";
import { connectDB } from "./db/connect";
import gameRoutes from "./modules/game/game.routes";
import roundRoutes from "./modules/round/round.routes";

const app = express();
app.use(cors({ origin: config.feUrl }));

app.use(express.json());
app.use("/api", gameRoutes, roundRoutes);

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `#### - 🚀 Server running → http://localhost:${config.port} - ####`
    );
  });
});
