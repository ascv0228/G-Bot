import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";



export = {
    name: "choose",
    aliases: [],
    description: '隨機選出一個選項',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        return msg.reply({ content: `${args[args.length * Math.random() | 0]}` });
    }
}