import express from 'express';
import { twitterService } from '../service';
import createCachedRouterCallback from '../helper/routerHelper';

const router = express.Router();

router.get('/feed', createCachedRouterCallback(twitterService.getLatestTweetForHashtag.bind(twitterService)));

export default router;
