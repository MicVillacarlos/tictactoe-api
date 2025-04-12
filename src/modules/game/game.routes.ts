import { Router } from 'express';
import { addGame } from './game.controller';

const router = Router();

router.post('/games', addGame);

export default router;