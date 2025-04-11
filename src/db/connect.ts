import mongoose from 'mongoose';
import { config } from '../config/config';

export const connectDB = async () => {
    try {
    await mongoose.connect(config.mongoURI);
    console.log('\x1b[36m%s\x1b[0m', '#### - ✅ Connected to MongoDB ✅ - #####');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Stop app if DB connection fails
  }
};
