import { MongoClient } from "mongodb";
import mongoose from "mongoose"

export interface GMongoClient extends MongoClient {
    connect2DB(): Promise<any>;
    closeDB(): Promise<any>;
}

export interface Database {
    DB_URI: string;
    svr: GMongoClient;
    db2: GMongoClient;
}


export interface DBManager {
    db: Database;
    gdb: Database;
    connectAll(): Promise<any>;
    closeAll(): Promise<any>;
}