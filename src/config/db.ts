import mongoose from 'mongoose';
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

export { connectToDatabase };