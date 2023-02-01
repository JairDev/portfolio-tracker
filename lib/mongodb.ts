import { Db, MongoClient } from "mongodb";
import mongoose from "mongoose";

const MONGO_URI = process.env.DB_URL;
const MONGODB_DB = process.env.MONGODB_DB;
//@ts-ignore
let cached = global.mongoose;

if (!cached) {
  //@ts-ignore

  cached = global.mongoose = { conn: null, promise: null };
}

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
export async function dbConnect() {
  if (cached.conn) {
    // console.log("cached");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    //@ts-ignore
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("connect db");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
