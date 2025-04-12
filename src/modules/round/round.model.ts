import mongoose, { Schema } from 'mongoose';
import { IRound } from './type';

const RoundSchema: Schema = new Schema(
  {
    game_id: { type: mongoose.Schema.Types.ObjectId, ref: "Game", required: true },
    board: { type: [String], required: true },
    winner: {
      type: String,
      enum: ["X", "O"],
    },
    status: {
      type: String,
      enum: ["incomplete", "draw", "completed"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Round = mongoose.model<IRound>('Round', RoundSchema);
