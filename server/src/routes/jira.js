import express from 'express';
import { jiraService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/in-progress', createCachedRouterCallback(jiraService.fetchInProgress.bind(jiraService)));
router.get('/selected-for-development', createCachedRouterCallback(jiraService.fetchSelectedForDevelopment.bind(jiraService)));
router.get('/ready-for-qa', createCachedRouterCallback(jiraService.fetchReadyForQA.bind(jiraService)));

export default router;
