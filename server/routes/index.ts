import express from 'express';
import linkedinController from '../controllers/linkedinController';
import schedulePostRoutes from './schedulePost';
import userController from '../controllers/userController';

const router = express.Router();

router.use('/auth/linkedin', linkedinController);
router.use('/api', schedulePostRoutes);
router.use('/users', userController);

export default router;