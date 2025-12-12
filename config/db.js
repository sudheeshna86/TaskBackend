// config/db.js
import mongoose from "mongoose";

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      // useNewUrlParser, useUnifiedTopology are defaults in newer mongoose
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
