import Discord from "discord.js";
import tools from "../../utils/tools";
import dcUtil from "../../utils/discord-util";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";

export = {
    name: "Virtual Fisher Fish",
    mat: /^You caught:$/,
    description: 'Virtual Fisher 釣魚次數',
    permissions: [],
    roles: [],
    users: ['574652751745777665'],
    type: [CmdType.Bot],
    bot: true,

    async execute(client: ZClient, msg: Discord.Message, embed: Discord.Embed) {
        let owner = await dcUtil.getMemberByID(msg.guild, process.env.BOT_OWNER)
        if (![owner.nickname, owner.user.username].includes(embed.author.name)) return;
        if(process.env.BOT_PREFIX != process.env.MAIN_BOT_PREFIX) return;
        client.botStatus['Now_fish_count'] += 1;
        if (client.botStatus['Now_fish_count'] % 10 == 0) {
            (client.botStatus['fish_count_message'] as Discord.Message).edit({
                content:
                    '`上次釣魚` : ' + String(client.botStatus['Before_fish_count'])
                    + '\n`這次釣魚` : ' + String(client.botStatus['Now_fish_count'])
            })
        }

    }
};

// 