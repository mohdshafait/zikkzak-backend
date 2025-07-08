import { Router } from 'express';
import { generateRoast } from '../controllers/roastController';

const router = Router();
router.post('/', generateRoast);
export default router;
