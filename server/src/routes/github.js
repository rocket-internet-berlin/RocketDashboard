import express from 'express';
import { githubService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/pr', createCachedRouterCallback(githubService.fetchGitData.bind(githubService)));

export default router;
