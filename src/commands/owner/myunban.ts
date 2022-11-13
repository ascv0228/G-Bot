import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data";

export = {
    name: "myunban",
    aliases: [],
    guilds: [],
    permissions: [],
    users: [dataJson["user"]["me"]],
    description: '解除停權某個使用者',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 2) {
            console.log(`${client.prefix}${this.name} <server-id> <tag-user>`)
            return;
        }
        let guild = await dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        guild.members.unban(dcUtil.pickUserId(args[1]), 'N/A')
            .then(user => console.log(`Unbanned ${args[1]} from ${guild.name}`))
            .catch(console.error);
    }
};
