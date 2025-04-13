import Container from "typedi";
import { GameService } from "./game.service";
import { Request, Response } from "express";

const gameService = Container.get(GameService);

export const addGame = async (req: Request, res: Response) => {
  try {
    const { playerXName, playerOName } = req.body;
    const newGame = await gameService.createGame(playerXName, playerOName);
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ error: "Failed to create game" });
  }
};

export const fetchGames = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.params;
    const game = await gameService.fetchGames(Number(page), Number(limit));
    res.status(200).json(game);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch" });
  }
};

export const getGame = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const game = await gameService.getGame(id)
    res.status(200).json(game);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch" });
  }
};