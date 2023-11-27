import { redisClient } from '../../config/redis';

class RedisAnalyticsService{
    async getDurations(path: string): Promise<string[]> {
        if (!redisClient) {
          throw new Error('Redis client is not connected');
        }
    
        const key = `${path}:durations`;
        const durations = await redisClient.lrange(key, 0, -1);
        return durations;
    }

    async getResourceUsage(): Promise<string[]> {
        if (!redisClient) {
          throw new Error('Redis client is not connected');
        }
    
        const usage = await redisClient.lrange("resourceUsage", 0, -1);
        return usage;
    }
}

export default new RedisAnalyticsService();