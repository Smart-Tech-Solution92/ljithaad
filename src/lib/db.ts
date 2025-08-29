import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("MONGODB_URI is not defined");

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

let dbInstance: Db | null = null;

export async function getDB(): Promise<Db> {
  if (dbInstance) return dbInstance;
  const client = await clientPromise;

  const dbName = client.db().databaseName; 
  dbInstance = client.db(dbName);
  return dbInstance;
}

export default clientPromise;
