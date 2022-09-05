
import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "vfdaily",
    aliases: ['daily', 'vf-daily'],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: 'vf-bot daily',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        msg.reply(`client.botStatus['daily']: ${String(client.botStatus['daily'])} => ${String(true)}`)
        client.botStatus['daily'] = true
        msg.channel.send(`<@${process.env.BOT_OWNER}> 已經關閉daily提醒， 記得確實完成`);
    }
};

