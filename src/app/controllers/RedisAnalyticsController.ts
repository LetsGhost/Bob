import { Request, Response } from 'express';
import RedisAnalyticsService from '../services/RedisAnalyticsService.js';
import logger from '../../config/winstonLogger.js';
import getClientIp from '../Utils/ipUtils.js';

class RedisAnalyticsController {
    async getDurations(req: Request, res: Response) {
        try{
            const path = req.params.path;
            const durations = await RedisAnalyticsService.getDurations(path);

            if(durations){
                logger.info("Durations retrieved successfully: " + getClientIp(req), {service: "RedisAnalyticsController.getDurations"})
            }

            res.json(durations);
        } catch(error){
            logger.error("Error getting durations: ", error, {service: "RedisAnalyticsController.getDurations"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }

    async getResourceUsage(req: Request, res: Response) {
        try{
            const key = req.params.key;
            const usage = await RedisAnalyticsService.getResourceUsage();

            if(usage){
                logger.info("Resource usage retrieved successfully: " + getClientIp(req), {service: "RedisAnalyticsController.getResourceUsage"})
            }

            res.json(usage);
        } catch(error){
            logger.error("Error getting resource usage: ", error, {service: "RedisAnalyticsController.getResourceUsage"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }

    async getMethodCounter(req: Request, res: Response) {
        try{
            const method = req.params.method;
            const counter = await RedisAnalyticsService.getMethodCounter(method);

            if(counter){
                logger.info("Method counter retrieved successfully: " + getClientIp(req), {service: "RedisAnalyticsController.getMethodCounter"})
            }

            res.json(counter);
        } catch(error){
            logger.error("Error getting method counter: ", error, {service: "RedisAnalyticsController.getMethodCounter"})
            return res.status(500).json({
                success: false,
                code: 500,
                message: "Internal Server Error"
            });
        }
    }
}

export default new RedisAnalyticsController();
