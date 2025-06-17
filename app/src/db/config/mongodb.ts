import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mondodb://localhost:27017";

const client: MongoClient = new MongoClient(uri);
let db: Db;

export function connect() {
   db = client.db("gc-2");
   return db;
}

export function getDb() {
   if (!db) return connect();
   return db;
}
