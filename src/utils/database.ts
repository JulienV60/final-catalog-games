import { MongoClient } from "mongodb";
import { Db } from "mongodb";
const MONGO_URL = process.env.MONGO_URL || "";
let cachedDb: Db;

export function getDatabase(): Promise<Db> {
  if (cachedDb) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(MONGO_URL).then((client) => {
    cachedDb = client.db();
    return cachedDb;
  });
}
