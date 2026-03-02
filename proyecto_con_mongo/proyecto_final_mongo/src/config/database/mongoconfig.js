import 'dotenv/config';
import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando MongoDB:', error.message);
    process.exit(1);
  }
};
