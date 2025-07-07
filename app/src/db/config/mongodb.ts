import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
// console.log(uri, "<<<<<,");

const client: MongoClient = new MongoClient(uri);
let db: Db;

export function connect() {
   db = client.db("gs2");
   return db;
}

export function getDb() {
   if (!db) return connect();
   return db;
}
