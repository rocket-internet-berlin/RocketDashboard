import express from 'express';
import { newRelicService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/errors', createCachedRouterCallback(newRelicService.getTransactionErrors.bind(newRelicService)));
router.get('/loadTime', createCachedRouterCallback(newRelicService.getLoadTime.bind(newRelicService)));
router.get('/uniqueSessions', createCachedRouterCallback(newRelicService.getUniqueSessions.bind(newRelicService)));
router.get('/successfulBookings', createCachedRouterCallback(newRelicService.getSuccessfulBookings.bind(newRelicService)));
router.get('/cliErrors', createCachedRouterCallback(newRelicService.getCLIErrors.bind(newRelicService)));
router.get('/errorBreakdown', createCachedRouterCallback(newRelicService.getErrorBreakdown.bind(newRelicService)));
router.get('/websiteFunnel', createCachedRouterCallback(newRelicService.getWebsiteFunnel.bind(newRelicService)));

export default router;
