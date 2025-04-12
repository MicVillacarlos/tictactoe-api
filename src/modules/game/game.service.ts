import { Service } from "typedi";
import { Game, IGame } from "./game.model";

@Service()
export class GameService {
  async getAllGames(): Promise<IGame[]> {
    return Game.find();
  }

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
}
