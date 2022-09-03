import db from "./db";
// import { HashData } from "../structure/model/hashData";


export default {
    // async find(id): Promise<HashData> {
    //     const ret = {} as HashData;

    //     try {
    //         const collection = db.svr.db('G-Bot').collection('Clients');
    //         const item = (await collection.findOne({
    //             userId: id,
    //         }) || {}) as HashData;

    //         ret.userId = item.userId || id;
    //         ret.accounts = item.accounts || [];
    //     } finally {

    //     }

    //     return ret;
    // },

    async update(channelId: string, authorId: string): Promise<void> {
        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            await collection.updateOne({
                type: 'check-msg',
                channelId: channelId
            }, {
                $set: {
                    users: { $each: [authorId] },
                }
            });
        } finally { }
    },

    async findAll(channelId: string): Promise<string[]> {
        let user_ids: string[];

        try {
            const collection = db.svr.db('G-Bot').collection('Clients');
            const datas = await collection.find({ type: "check-msg", channelId: channelId }).toArray();
            console.log(datas)
            user_ids = datas[0].users.filter(function (elem, pos) {
                return datas[0].users.indexOf(elem) == pos;
            })

        } finally { }

        return user_ids;
    },

    async checkInMsg(channelId: string, user_id: string): Promise<boolean> {
        const collection = db.svr.db('G-Bot').collection('Clients')
        let temp = await collection.find({ type: "check-msg", channelId: channelId }).toArray();
        console.log(temp)
        let user_ids = temp[0].users
        return user_ids.includes(user_id)
    },

};
