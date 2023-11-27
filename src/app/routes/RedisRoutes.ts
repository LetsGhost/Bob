import express from 'express';

// Import Middlewares

import AuthenticateRole from '../middleware/AuthenticateRole';
import AuthenticateToken from '../middleware/AuthenticateToken';

import RedisAnalyticsController from '../controllers/RedisAnalyticsController';

// Import routes
const router = express.Router();

router.get('/getDurations/:path', RedisAnalyticsController.getDurations);
router.get('/getResourceUsage', RedisAnalyticsController.getResourceUsage);

export default router;
