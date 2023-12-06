import Redis from 'ioredis';
import logger from './winstonLogger.js';

let redisClient: Redis | null = null;

const connectToRedis = async (): Promise<Redis | null> => {

  try {
    const redisUrl = `redis://:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
    logger.info(`Connecting to Redis at ${process.env.REDIS_PORT}`, { service: 'connectToRedis' });

    redisClient = new Redis(redisUrl);
  } catch (err) {
    logger.error(`Failed to connect or ping Redis: ${err}`, { service: 'connectToRedis' });
  }

  return redisClient;
};

export { connectToRedis, redisClient };