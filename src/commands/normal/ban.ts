import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import userInfo from "./user-info";


export = {
    name: "ban",
    aliases: [],
    description: '對某人停權',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<user>"
    ],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {

        if (!args.length) return msg.reply('You need tag someone.')
        let member = await dcUtil.getMemberByID(msg.guild, dcUtil.pickUserId(args[0]))
        if (member && member.permissions.has(Discord.PermissionsBitField.Flags.Administrator))
            return msg.channel.send(`你無法 ban ${args[0]}`);
        try {
            let user = await msg.guild.members.ban(dcUtil.pickUserId(args[0])) as any

            console.log(`Banned ${user.username || user.id || user} from ${msg.guild.name}`);
            msg.channel.send(`Banned ${user.username || user.id || user} from ${msg.guild.name}`);

        }
        catch (e) {
            msg.channel.send(`你無法 ban ${args[0]}`)
        }

    }
};