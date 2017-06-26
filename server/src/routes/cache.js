import express from 'express';
import { getResponseSuccess } from '../helper/responseHelper';

const router = express.Router();

router.get('/index', (req, res) => res.json(getResponseSuccess(req.app.locals.services.cacheService.keys())));
router.get('/clear', (req, res) => res.json(getResponseSuccess(req.app.locals.services.cacheService.clear())));

export default router;
