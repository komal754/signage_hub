import mongoose from 'mongoose';
export {};
declare global {
  var mongoose: undefined | {
    conn: typeof import('mongoose') | null;
    promise: Promise<typeof import('mongoose')> | null;
  };
}

const MONGODB_URI: string = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = global.mongoose as {
  conn: typeof import('mongoose') | null;
  promise: Promise<typeof import('mongoose')> | null;
} | undefined;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongoose = cached;
}

async function dbConnect() {
  if (!cached) {
    cached = { conn: null, promise: null };
    global.mongoose = cached;
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => mongooseInstance);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
