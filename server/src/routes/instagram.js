import express from 'express';
import { instagramService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/location', createCachedRouterCallback(instagramService.fetchInstagramInfo.bind(instagramService)));

export default router;
