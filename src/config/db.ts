import mongoose from 'mongoose';
import {redisClient} from './redis';
import logger from './winstonLogger';

const connectToDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            logger.error('MONGODB_URI environment variable is not set.', { service: 'Database' });
            throw new Error('MONGODB_URI environment variable is not set.');
        }

        await mongoose.connect(mongoURI);
        logger.info('Connected to database.', { service: 'Database' });
    } catch (err) {
        logger.error(`Failed to connect to database: ${err}`, { service: 'Database' });
    }
};

const logDatabaseStats = async () => {
    mongoose.connection.on('connected', async () => {
        try {
            const stats = await mongoose.connection.db.stats();

            if (!redisClient) {
                console.error('Redis client is not connected.');
                return;
            }

            // Store the stats in Redis
            redisClient.set('dbStats', JSON.stringify(stats));
        } catch (err) {
            console.error(err);
        }
    });
};

export { connectToDatabase, logDatabaseStats };