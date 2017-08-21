import express from 'express';
import { triviaService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/today', createCachedRouterCallback(triviaService.getTodaysTrivia.bind(triviaService)));

export default router;
