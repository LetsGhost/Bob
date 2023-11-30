import { redisClient } from '../../config/redis';
import logger from '../../config/winstonLogger';

class RedisAnalyticsService{
    async getDurations(path: string): Promise<string[]> {
      try{
        if (!redisClient) {
          logger.error('Redis client is not connected', {service: "RedisAnalyticsService.getDurations"});
          throw new Error('Redis client is not connected');
        }
    
        const key = `${path}:durations`;
        const durations = await redisClient.lrange(key, 0, -1);
        return durations;
      } catch(error){
        logger.error("Error getting durations: ", error, {service: "RedisAnalyticsService.getDurations"})
        return [];
      }
        
    }

    async getResourceUsage(): Promise<string[]> {
      try{
        if (!redisClient) {
          logger.error('Redis client is not connected', {service: "RedisAnalyticsService.getResourceUsage"});
          throw new Error('Redis client is not connected');
        }
    
        const usage = await redisClient.lrange("resourceUsage", 0, -1);
        return usage;
      } catch(error){
        logger.error("Error getting resource usage: ", error, {service: "RedisAnalyticsService.getResourceUsage"})
        return [];
      }
    }
}

export default new RedisAnalyticsService();