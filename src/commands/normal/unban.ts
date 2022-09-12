import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";


export = {
    name: "unban",
    aliases: [],
    description: '解除封鎖使用者',
    permissions: ["ManageGuild"],
    roles: [],
    type: [CmdType.Universal],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length == 0) return;
        msg.guild.members.unban(dcUtil.pickUserId(args[0]), 'N/A')
            .then(user => {
                console.log(`Unbanned ${args[0]} from ${msg.guild.name}`);
                msg.reply({ content: `Unbanned ${args[0]} from ${msg.guild.name}` });
            })
            .catch(console.error);
    }
};
