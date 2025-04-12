import { Router } from 'express';
import { addRound, fetchRounds, updateBoard, updateRound } from './round.controller';

const router = Router();

router.post("/round", addRound);
router.patch("/round/:id", updateRound);
router.patch("/round/board/:id", updateBoard);
router.get('/round/:gameId/:page/:limit', fetchRounds)

export default router;