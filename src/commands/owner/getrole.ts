import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import dataJson from "../../data"

export = {
    name: "getrole",
    aliases: ['gr'],
    permissions: [],
    users: [dataJson.user['me']],
    description: '取得伺服器身分組',
    roles: [],
    type: [CmdType.Owner],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 2) return msg.reply(`${client.prefix}${this.name} <server-id> <role-id>`);
        let guild = await dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        let member = await dcUtil.getMemberByID(guild, dataJson['user']['me']);
        member.roles.add(args[1]);
    }
}
