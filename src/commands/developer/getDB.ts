import Discord from "discord.js";
import auth from "../../utils/auth";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType, CmdTypeName } from "../../utils/types";
import db from "../../database/db";
import rewardDao from "../../database/rewardDao"
import hashDataDao from "../../database/hashDataDao"

export = {
    name: "getDB",
    // users: ['411895879935590411', '702385586941722654', '342604295520124939',
    //     '830469275528986695', '765629373084074064'],
    guilds: ['829673608791851038', '864925734581043280'],
    description: '查看當前database',
    permissions: [],
    roles: [],
    type: [CmdType.Developer],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0 || args.includes('-h')) {
            let temp = [
                '`' + 'all' + '`' + " : 查看全部",
                '`' + 'reward' + '`' + " : 查看輔助獎勵",
                '`' + 'check-msg' + '`' + " : 查看當日紀錄區發文紀錄",
                '`' + '-h' + '`' + " : 查看參數"
            ]
            return msg.reply({ content: temp.join("\n") });
        }
        if (args.includes('all'))
            getAll(client, msg, args);
        if (args.includes('reward')) {
            getReward(msg, 'reward-ticket');
            getReward(msg, 'reward-big-ticket');
            getReward(msg, 'reward-4000-ticket');
        }

        if (args.includes('hashData')) {
            gethashData(msg, '963831403001307167')
            gethashData(msg, '867811395474423838')
            gethashData(msg, '948120050458574878')
        }
        if (args.includes('check-msg')) {
            getCheckMsg(client, msg, args)
        }
        if (args.includes('music')) {
            getMusic(client, msg, args)
        }
        if (args.includes('activity') || args.includes('ActivityCommand'))
            getActivityCommand(client, msg, args);

        return msg.reply('Finish!');
    }
};


async function getAll(client: ZClient, msg: Discord.Message, args: string[]) {
    const collect = db.svr.db('G-Bot').collection('Clients')
    let temp = await (db.svr.db('G-Bot').collection('Clients').find({})).toArray();
    let jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.AttachmentBuilder(Buffer.from(jsonString, 'utf-8'), { name: 'log.json' });
    msg.author.send({ files: [attachment] });
}

async function getReward(msg: Discord.Message, type: string) {
    let temp = await rewardDao.getString(type);
    let jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.AttachmentBuilder(Buffer.from(jsonString, 'utf-8'), { name: `${type}.json` });
    msg.author.send({ files: [attachment] });
}

async function getCheckMsg(client: ZClient, msg: Discord.Message, args: string[]) {
    let temp = await db.svr.db('G-Bot').collection('Clients').find({ type: 'check-msg' }).toArray();
    let jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.AttachmentBuilder(Buffer.from(jsonString, 'utf-8'), { name: 'log.json' });
    msg.author.send({ files: [attachment] });
}

async function getActivityCommand(client: ZClient, msg: Discord.Message, args: string[]) {
    let temp = await db.svr.db('G-Bot').collection('Clients').find({ type: 'ActivityCommand' }).toArray();
    let jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.AttachmentBuilder(Buffer.from(jsonString, 'utf-8'), { name: 'log.json' });
    msg.author.send({ files: [attachment] });
}

async function gethashData(msg: Discord.Message, channelId: string) {
    let temp = await hashDataDao.getString(channelId);
    let jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.AttachmentBuilder(Buffer.from(jsonString, 'utf-8'), { name: `${channelId}.json` });
    msg.author.send({ files: [attachment] });
}

async function getMusic(client: ZClient, msg: Discord.Message, args: string[]) {
    const collect = db.svr.db('G-Bot').collection("MusicCache")
    let temp = await (collect.find({})).toArray();
    let jsonString = JSON.stringify({ ...temp }, null, 4);
    const attachment = new Discord.AttachmentBuilder(Buffer.from(jsonString, 'utf-8'), { name: 'log.json' });
    msg.author.send({ files: [attachment] });
}