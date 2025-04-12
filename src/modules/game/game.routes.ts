import { Router } from 'express';
import { addGame, fetchGames } from './game.controller';

const router = Router();

router.post('/games', addGame);
router.get('/games/:page/:limit', fetchGames)

export default router;