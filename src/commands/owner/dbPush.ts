import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import scheduleUtil from "../../utils/schedule-util";
import db from "../../database/db"

export = {
    name: "dbPush",
    aliases: [],
    guilds: ['829673608791851038', '864925734581043280'],
    description: '編輯database',
    type: [CmdType.Owner],
    permissions: [],
    usage: [`<dbClass> <user-id> <count>`],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 2) return msg.reply(`${client.prefix}!${this.name} <dbClass> <something> ...`);
        if (args[0] == 'reward-4000-ticket' || args[0] == 'reward-4000') {
            Reward4000(client, args)
            return msg.reply('Finish!');
        }

    }
}

async function Reward4000(client: ZClient, args: string[]) {
    db.svr.db('G-Bot').collection('Clients').updateOne({ type: 'reward-4000-ticket' }, { "$set": { [`msg.${args[1]}`]: `${args[2]}` } });
}
