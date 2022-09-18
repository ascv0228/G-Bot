import db from "./db";
import { HashData } from "../structure/model/hashData";
import { WithId, Document } from "mongodb";

export default {
    async find(id): Promise<HashData> {
        const ret = {} as HashData;

        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            const item = (await collection.findOne({
                userId: id,
            }) || {}) as HashData;

            ret.userId = item.userId || id;
            ret.accounts = item.accounts || [];
        } finally {

        }

        return ret;
    },

    async update(channelId: string, hashData: string, msg_url: string): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            await collection.updateOne({
                type: 'hashData', channelId: channelId
            }, {
                $set: {
                    [`hash.${hashData}`]: urlEncode(msg_url),
                }
            }, { upsert: true });
        } finally { }
    },

    async deleteOne(channelId: string, hashData: string, msg_id: string) {
        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            let temp = await collection.find({ type: 'hashData', channelId: channelId, [`hash.${hashData}`]: msg_id }).toArray();
            return temp
            // await collection.updateOne({
            //     type: 'hashData', channelId: channelId
            // }, {
            //     $set: {
            //         [`hash.${hashData}`]: urlEncode(msg_url),
            //     }
            // }, { upsert: true });
        } finally { }
    },
    /*
        async findAll(): Promise<BindDataCollection> {
            const ret = {};
    
            try {
                const collection = db.svr.db('G-Bot').collection("BindData");
                const datas = collection.find();
                await datas.forEach((item: BindData) => {
                    const tmp = {} as BindData;
    
                    tmp.userId = item.userId;
                    tmp.accounts = item.accounts || [];
    
                    ret[tmp.userId] = tmp;
                });
    
            } finally { }
    
            return ret;
        },*/

    async checkNotInDatabase(channelId: string, hashData: string) {
        const collection = db.svr.db('G-Bot').collection('Clients')
        let temp = await collection.find({ type: 'hashData', channelId: channelId }).toArray();
        return temp[0].hash[hashData]
    },

    async getString(channelId: string): Promise<WithId<Document>[]> {
        const collection = db.svr.db('G-Bot').collection('Clients')
        let temp = await collection.find({ type: 'hashData', channelId: channelId }).toArray();
        return temp
    }
};

function urlEncode(url: string) {
    if (!url) return null;
    const mats = url.match(/https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/);
    return mats[3]
}