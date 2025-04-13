import { Service } from "typedi";
import { Round } from "./round.model";
import { Game } from "../game/game.model";
import mongoose, { PipelineStage } from "mongoose";
import { FetchRoundData, IRound } from "./type";

@Service()
export class RoundService {
  async createRound(
    game_id: string
  ): Promise<{ success: boolean; round?: IRound; error?: string }> {
    try {
      const roundData = {
        game_id: new mongoose.Types.ObjectId(game_id),
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

  async updateRound(
    _id: string,
    board: string[],
    winner: string | null,
    status: string
  ): Promise<{ success: boolean; round?: IRound; error?: string }> {
    try {
      const round = await Round.findByIdAndUpdate(
        _id,
        { $set: { board, winner, status } },
        { new: true }
      );

      if (!round) {
        return { success: false, error: "Round not found" };
      }

      if (winner === "X" || winner === "O") {
        const updateField = winner === "X" ? "playerX.score" : "playerO.score";

        await Game.findByIdAndUpdate(round.game_id, {
          $inc: { [updateField]: 1 },
        });
      }

      return { success: true, round };
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";
      return { success: false, error: errorMessage };
    }
  }

  async fetchRounds(
    gameId: string,
    page: number,
    limit: number
  ): Promise<{ count?: number; data?: FetchRoundData[]; error?: string }> {
    try {

      const skip = (page - 1) * limit;
      const fetchAggregation: PipelineStage[] = [
        {
          $match: {
            game_id: new mongoose.Types.ObjectId(gameId),
          },
        },
        {
          $lookup: {
            from: "games",
            localField: "game_id",
            foreignField: "_id",
            as: "game",
          },
        },
        {
          $unwind: "$game",
        },
        {
          $addFields: {
            winnerName: {
              $cond: {
                if: { $eq: ["$winner", "X"] },
                then: "$game.playerX.name",
                else: {
                  $cond: {
                    if: { $eq: ["$winner", "O"] },
                    then: "$game.playerO.name",
                    else: null,
                  },
                },
              },
            },
            loserName: {
              $cond: {
                if: { $eq: ["$winner", "X"] },
                then: "$game.playerO.name",
                else: {
                  $cond: {
                    if: { $eq: ["$winner", "O"] },
                    then: "$game.playerX.name",
                    else: null,
                  },
                },
              },
            },
          },
        },
        {
          $project: {
            game: 0,
          },
        },
        {
          $setWindowFields: {
            sortBy: { createdAt: 1 }, 
            output: {
              roundNum: { $rank: {} },
            },
          },
        },
        { $skip: skip },
        { $limit: limit },
      ];

      const countAggregation: PipelineStage[] = [
        {
          $match: {
            game_id: new mongoose.Types.ObjectId(gameId),
          },
        },
        {
          $count: "count",
        },
      ];

      const [count, result] = await Promise.all([
        Round.aggregate(countAggregation),
        Round.aggregate(fetchAggregation),
      ]);

      return {
        count: count[0]?.count ?? 0,
        data: result,
      };
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";

      return { error: errorMessage || "Unknown error" };
    }
  }
}
