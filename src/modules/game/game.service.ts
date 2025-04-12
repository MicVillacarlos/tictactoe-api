import { Service } from "typedi";
import { Game } from "./game.model";
import { PipelineStage } from "mongoose";
import { IGame } from "./type";

@Service()
export class GameService {
  async createGame(
    playerXName: string,
    playerOName: string
  ): Promise<{ success: boolean; game?: IGame; error?: string }> {
    try {
      const gameData = {
        playerX: { name: playerXName, score: 0 },
        playerO: { name: playerOName, score: 0 },
      };

      const game = await Game.create(gameData);

      return { success: true, game };
    } catch (error) {
      const errorMessage =
        (error as { message?: string })?.message ||
        "An unexpected error occurred.";

      return { success: false, error: errorMessage || "Unknown error" };
    }
  }

  async fetchGames(page: number, limit: number):Promise<{ count?: number; data?: any, error?:string }> {
    try {
      const skip = (page - 1) * limit;
      const fetchAggregation: PipelineStage[] = [
        {
          $lookup: {
            from: "rounds",
            localField: "_id",
            foreignField: "game_id",
            as: "rounds",
          },
        },
        {
          $addFields: {
            rounds: { $size: "$rounds" },
            overAllWinner: {
              $cond: {
                if: { $gt: ["$playerX.score", "$playerO.score"] },
                then: "$playerX",
                else: {
                  $cond: {
                    if: { $gt: ["$playerO.score", "$playerX.score"] },
                    then: "$playerO",
                    else: null,
                  },
                },
              },
            },
          },
        },
        { $sort: { createdAt: 1 } },
        { $skip: skip },
        { $limit: limit },
      ];

      const countAggregation: PipelineStage[] = [
        {
          $count: "count",
        },
      ];

      const [count, result] = await Promise.all([
        Game.aggregate(countAggregation),
        Game.aggregate(fetchAggregation),
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
