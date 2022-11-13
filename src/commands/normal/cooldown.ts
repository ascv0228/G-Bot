import Discord from "discord.js";
import tools from "../../utils/tools";
import dcUtil from "../../utils/discord-util";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: 'cooldown',
    aliases: ["cd"],
    description: '重設成員指令冷卻時間',
    permissions: ["ManageGuild"],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "<user> <command name>"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        if (args.length < 2) {
            await msg.channel.send({ content: tools.usageString(client, this) });
            return;
        }

        const dcId = dcUtil.pickUserId(args[0]);
        const execname = args[1];

        if (!dcId) {
            await msg.channel.send({ content: tools.usageString(client, this) });
            return;
        }

        const cooldownTag = `${dcId}_${execname}`;

        if (client.cooldown.delete(cooldownTag)) {
            await msg.channel.send({ content: '重設成功!' });
        } else {
            await msg.channel.send({ content: tools.usageString(client, this) });
        }
    },
};