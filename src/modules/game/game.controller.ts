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
