import express from "express";
import "reflect-metadata";
import { config } from "./config/config";
import { connectDB } from "./db/connect";
import gameRoutes from './modules/game/game.routes'; 

const app = express();

// ✅ Middleware
app.use(express.json());

// Routes
app.use('/api', gameRoutes); // base route

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(
      "\x1b[36m%s\x1b[0m",
      `#### - 🚀 Server running → http://localhost:${config.port} - ####`
    );
  });
});
