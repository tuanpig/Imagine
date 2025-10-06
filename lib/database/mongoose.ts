import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGO_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Safely define a global cache to prevent multiple connections in development
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseConnection;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URL) {
    throw new Error("Missing MONGODB_URL environment variable");
  }

  // Create a connection promise if it doesn’t exist
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "imagine",
      bufferCommands: false,
    });
  }

  // Wait for the promise to resolve and store the connection
  cached.conn = await cached.promise;
  return cached.conn;
};
