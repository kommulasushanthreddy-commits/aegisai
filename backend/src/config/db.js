import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/aegisai';
  try {
    // Attempt Mongoose connection with 3-second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('✅ Connected to MongoDB Atlas / Local Database via Mongoose');
    return true;
  } catch (err) {
    console.warn('⚠️ MongoDB connection unavailable or timed out. Operating in memory-backed mode:', err.message);
    return false;
  }
}
