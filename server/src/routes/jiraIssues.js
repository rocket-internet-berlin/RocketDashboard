import express from 'express';
import { jiraService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/', createCachedRouterCallback(jiraService.fetchStatus.bind(jiraService)));

export default router;
