import { Router } from 'express';
import { addGame, fetchGames, getGame } from './game.controller';

const router = Router();

router.post('/games', addGame);
router.get('/games/:page/:limit', fetchGames)
router.get('/games/:id', getGame)

export default router;