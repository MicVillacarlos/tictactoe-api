import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT ?? 4000,
  mongoURI: process.env.MONGO_URI || "",
};
