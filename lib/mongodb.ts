import { Db, MongoClient } from "mongodb";

const MONGO_URI = process.env.DB_URL;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient: MongoClient;
let cachedDb: Db;

export async function connectToDataBase() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  if (!MONGO_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  let client = new MongoClient(MONGO_URI);
  await client.connect();
  let db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
