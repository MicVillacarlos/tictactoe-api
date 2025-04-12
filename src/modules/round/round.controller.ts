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
