import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: "myban",
    aliases: [],
    guilds: [],
    permissions: [],
    users: ['411895879935590411'],
    description: '停權某個使用者',
    roles: [],
    type: [CmdType.Owner],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 2) return msg.reply({ content: '參數錯誤' });
        let guild = dcUtil.getGuildByID(client, args[0]);
        if (guild == null) return msg.reply(`Unknown ${args[0]}`)
        guild.members.ban(dcUtil.pickUserId(args[1]))
            .then(user => console.log(`Banned ${(user as Discord.User).username || (user as Discord.User).id || user} from ${guild.name}`))
            .catch(console.error);
    }
};
