import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// Import Middlewares

import AuthenticateRole from '../middleware/AuthenticateRole.js';
import AuthenticateToken from '../middleware/AuthenticateToken.js';

import RedisAnalyticsController from '../controllers/RedisAnalyticsController.js';

// Import routes
const router = express.Router();

if(process.env.NODE_ENV === 'production') {
    router.use(AuthenticateToken.authenticateToken);
    router.use(AuthenticateRole.authenticateRole);
}

router.get('/getDurations/:path', RedisAnalyticsController.getDurations);
router.get('/getResourceUsage', RedisAnalyticsController.getResourceUsage);
router.get('/getMethodCounter/:method', RedisAnalyticsController.getMethodCounter);

export default router;
