import { Router } from 'express';
import { addRound } from './round.controller';

const router = Router();

router.post('/round', addRound);

export default router;