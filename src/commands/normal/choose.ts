import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import tools from "../../utils/tools";
import dcUtil from "../../utils/discord-util";



export = {
    name: "choose",
    aliases: [],
    description: '隨機選出一個選項',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<one or more thing> ..."
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (!args.length)
            return msg.reply({ content: tools.usageString(client, this) });
        let str = `${args[args.length * Math.random() | 0]}`;
        return msg.reply({ content: await dcUtil.dealStringMention(msg.guild, str) });
    }
}