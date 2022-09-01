import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "ban",
    aliases: [],
    description: '對某人停權',
    permissions: ['Administrator'],
    roles: [],
    type: [CmdType.Universal],


    async execute(client: ZClient, msg: Discord.Message, args: string[]) {

        if (args.length == 0) return msg.reply('You need tag someone.')
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