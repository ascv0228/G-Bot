import { MongoClient } from "mongodb";
import { Database, GMongoClient } from "../structure/database";

const db = {
    DB_URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?${process.env.DB_OPTION}`,
} as Database;

const dbClient = new MongoClient(db.DB_URI) as GMongoClient;

db.svr = dbClient;

db.svr.connect2DB = function () {
    return this.connect();
};

db.svr.closeDB = function () {
    return this.close();
};

export default db;