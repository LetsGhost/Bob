import mongoose from 'mongoose';
import {redisClient} from './redis';

const connectToDatabase = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            console.error('MONGODB_URI environment variable is not set.');
            throw new Error('MONGODB_URI environment variable is not set.');
        }

        await mongoose.connect(mongoURI);
        console.log('Connected to the database');
    } catch (err) {
        console.error(err);
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