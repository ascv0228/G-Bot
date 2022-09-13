import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import tools from "../../utils/tools";



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
        return msg.reply({ content: `${args[args.length * Math.random() | 0]}` });
    }
}