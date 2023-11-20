import mongoose from 'mongoose';

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

export { connectToDatabase };