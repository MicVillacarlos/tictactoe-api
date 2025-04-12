import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer {
  name: string;
  score: number;
}

export interface IGame extends Document {
  playerX: IPlayer;
  playerO: IPlayer;
}

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
