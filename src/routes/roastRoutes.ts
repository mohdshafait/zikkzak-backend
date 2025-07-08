import express from 'express';
import { generateRoast } from '../controllers/roastController';
const router = express.Router();

router.post('/', generateRoast);

export default router;
