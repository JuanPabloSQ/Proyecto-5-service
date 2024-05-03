import mongoose from 'mongoose';

export default function initDb() {
  mongoose.connect(process.env.DB_CONNECT_URL, {
    dbName: process.env.DB_NAME,
  });
}
