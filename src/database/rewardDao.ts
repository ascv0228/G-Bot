import db from "./db";
import { RewardType } from "../utils/types";
import mongodb from "mongodb";

import { WithId, Document } from "mongodb";
// import { HashData } from "../structure/model/hashData";


// 'reward-4000-ticket'
// 'reward-ticket'
// 'reward-big-ticket'

export default {
    async getOriginCount(type: string, authorId: string): Promise<Number | string> {
        let originCount = 0;

        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            const item = await collection.find({ type: type }).toArray();
            originCount = item[0]['msg'][authorId]
        } finally {

        }
        return originCount;
    },

    async update(type: string, authorId: string, count: string): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            await collection.updateOne({
                type: type,
            }, {
                $set: {
                    [`msg.${authorId}`]: count,
                }
            });
        } finally { }
    },

    async findAll(type: string): Promise<Map<string, string>> {
        let ret: Map<string, string>;

        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            const datas = await collection.find({ type: type }).toArray();
            ret = new Map(Object.entries(datas[0].msg))

        } finally { }

        return ret;
    },

    async getString(type: string): Promise<WithId<Document>[]> {
        const collection = db.svr.db('G-Bot').collection('Clients')
        let temp = await collection.find({ type: type }).toArray();
        return temp
    }
};
