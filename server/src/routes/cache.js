import express from 'express';
import { getResponseSuccess } from '../helper/responseHelper';
import { cacheService } from '../service';

const router = express.Router();

router.get('/index', (req, res) => res.json(getResponseSuccess(cacheService.keys())));
router.get('/clear', (req, res) => res.json(getResponseSuccess(cacheService.clear())));

export default router;
