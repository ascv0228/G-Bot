import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import db from "../../database/db"
import tools from "../../utils/tools";

export = {
    name: "test",
    aliases: [],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: 'test',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let url = args[0];
        if (!matchMsgUrl(url)) return msg.reply({ content: 'error url' })
        let mat = matchMsgUrl(url);
        let channel = await client.channels.fetch(mat.channel) as Discord.TextChannel;
        let message = await channel.messages.fetch(mat.msg);
        msg.reply({ content: message.content })
    }
};

function matchMsgUrl(str: string): any {
    if (!str) return null;
    const mats = str.match(/https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/);
    if (mats) {
        return { guild: mats[1], channel: mats[2], msg: mats[3] };
    }
    return null;
}