import Container from "typedi";
import { Request, Response } from "express";
import { RoundService } from "./round.service";

const roundService = Container.get(RoundService);

export const addRound = async (req: Request, res: Response) => {
  try {
    const { game_id } = req.body;
    const newRound = await roundService.createRound(game_id);
    res.status(201).json(newRound);
  } catch (err) {
    res.status(400).json({ error: "Failed to create round" });
  }
};

export const updateBoard = async (req: Request, res: Response) => {
  try {
    const { board } = req.body;
    const round = await roundService.updateBoard(req.params.id, board);
    res.status(201).json(round);
  } catch (err) {
    res.status(400).json({ error: "Failed to update round" });
  }
};

export const updateRound = async (req: Request, res: Response) => {
  try {
    const { board, winner, status } = req.body;
    const round = await roundService.updateRound(
      req.params.id,
      board,
      winner,
      status
    );
    res.status(201).json(round);
  } catch (err) {
    res.status(400).json({ error: "Failed to update round" });
  }
};

export const fetchRounds = async (req: Request, res: Response) => {
  try {
    const { gameId, limit, page } = req.params;
    const game = await roundService.fetchRounds(gameId,Number(page), Number(limit));
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch" });
  }
};
