import { Router } from 'express';
import { schedulePost } from '../controllers/schedulePostController';

const router = Router();

router.post('/schedule-post', schedulePost);

export default router;
