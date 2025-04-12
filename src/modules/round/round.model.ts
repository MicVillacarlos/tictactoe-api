import mongoose, { Schema, Document } from 'mongoose';

export interface IRound extends Document {
  game_id: string;
  board: string[];
  winner: {
    name: string;
    type: 'x' | 'o';
  } | null;
  status: 'incomplete' | 'draw' | 'completed';
}

const RoundSchema: Schema = new Schema(
  {
    game_id: { type: String, required: true },
    board: { type: [String], required: true },
    winner: {
      name: { type: String },
      type: { type: String, enum: ['x', 'o'] },
    },
    status: {
      type: String,
      enum: ['incomplete', 'draw', 'completed'],
      required: true,
    },
  },
  { timestamps: true }
);

export const Round = mongoose.model<IRound>('Round', RoundSchema);
