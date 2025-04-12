import { Service } from "typedi";
import { Round, IRound } from "./round.model";

@Service()
export class RoundService {
  async createRound(
    game_id: string
  ): Promise<{ success: boolean; round?: IRound; error?: string }> {
    try {
      const roundData = {
        game_id: game_id,
        board: Array(9).fill(""),
        winner: null,
        status: "incomplete",
      };

      const round = await Round.create(roundData);

      return { success: true, round };
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      return { success: false, error: errorMessage || "Unknown error" };
    }
  }

  async updateBoard(
    _id: string,
    board: string[]
  ): Promise<{ success: boolean; round?: IRound; error?: string }> {
    try {
      const round = await Round.findByIdAndUpdate(
        _id,
        { $set: { board } },
        { new: true }
      );

      if (!round) {
        return { success: false, error: "Round not found" };
      }

      return { success: true, round };
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      return { success: false, error: errorMessage };
    }
  }
}
