import { Router } from 'express';
import { addRound, updateBoard } from './round.controller';

const router = Router();

router.post('/round', addRound);
router.patch('/round/board/:id', updateBoard);

export default router;