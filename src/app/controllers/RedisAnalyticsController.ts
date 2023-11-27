import { Request, Response } from 'express';
import RedisAnalyticsService from '../services/RedisAnalyticsService';

class RedisAnalyticsController {
    async getDurations(req: Request, res: Response) {
        const path = req.params.path;
        const durations = await RedisAnalyticsService.getDurations(path);
        res.json(durations);
    }

    async getResourceUsage(req: Request, res: Response) {
        const key = req.params.key;
        const usage = await RedisAnalyticsService.getResourceUsage();
        res.json(usage);
    }
}

export default new RedisAnalyticsController();