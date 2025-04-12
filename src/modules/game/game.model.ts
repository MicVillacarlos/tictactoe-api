import mongoose, { Schema } from "mongoose";
import { IGame } from "./type";

const PlayerSchema: Schema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

const GameSchema: Schema = new Schema(
  {
    playerX: {
      type: PlayerSchema,
      required: true,
    },
    playerO: {
      type: PlayerSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Game = mongoose.model<IGame>("Game", GameSchema);
