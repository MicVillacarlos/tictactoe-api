import { Document } from "mongoose";

export interface IRound extends Document {
  game_id: string;
  board: string[];
  winner: "X" | "O" | null;
  status: "incomplete" | "draw" | "completed";
}

export interface FetchRoundData {
  _id: string;
  game_id: string;
  board: string[];
  winner: "X" | "O" | null;
  status: "incomplete" | "draw" | "completed";
  createdAt: string;
  updatedAt: string;
  __v: number;
  winnerName?: string;
  loserName?: string;
}