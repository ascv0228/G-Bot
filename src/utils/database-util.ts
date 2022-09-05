
import Discord from "discord.js";
import { ZClient } from "../structure/client";
import db from "../database/db"

export default {
    async dbInitAll() {
        await db.svr.db('G-Bot').collection('Clients').drop()
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'reward-ticket', msg: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'reward-big-ticket', msg: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'reward-4000-ticket', msg: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'ActivityCommand', msg: new Map() });
    },

    async dbInitHash() {
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'hashData' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
    },

    async dbInitReward(args) {
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'reward-ticket' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'reward-ticket', msg: new Map() });
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'reward-big-ticket' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'reward-big-ticket', msg: new Map() });
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'reward-4000-ticket' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'reward-4000-ticket', msg: new Map() });
    },

    async dbInitCheckMsg(args) {
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'check-msg' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '963831403001307167', users: new Array() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '867811395474423838', users: new Array() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '886269472158138429', users: new Array() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'check-msg', channelId: '948120050458574878', users: new Array() });
    },

    async dbInitHashData(args) {
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'hashData' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '963831403001307167', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '867811395474423838', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '886269472158138429', hash: new Map() });
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'hashData', channelId: '948120050458574878', hash: new Map() });
    },

    async dbInitActivityCommand(args) {
        await db.svr.db('G-Bot').collection('Clients').deleteMany({ type: 'ActivityCommand' })
        await db.svr.db('G-Bot').collection('Clients').insertOne({ type: 'ActivityCommand', msg: new Map() });
    }
}
