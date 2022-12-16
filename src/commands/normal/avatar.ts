import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";

export = {
    name: 'avatar',
    aliases: ["avt"],
    description: '查看個人頭像',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        "",
        "<user>"
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let member = await dcUtil.getMemberByTag(msg.guild, args[0]) || msg.member;
        let opts = [
            {
                label: '使用者頭像',
                value: `avatar <@${member.id}>`,
            }
        ]
        if (member.avatar)
            opts.push({
                label: '伺服器頭像',
                value: `memberavatar <@${member.id}>`,
            })
        if (await checkHasBanner(client, member.user.id))
            opts.push({
                label: '橫幅',
                value: `banner <@${member.id}>`,
            })
        const row = new Discord.ActionRowBuilder<Discord.StringSelectMenuBuilder>()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId(`avatar###${msg.author.id}`)
                    .setPlaceholder('請選擇頭像來源/橫幅')
                    .addOptions(opts),
            );

        await msg.channel.send({ components: [row] });
    }
};


async function checkHasBanner(client: ZClient, userId: string) {
    try {
        const banner = await dcUtil.getBanner(userId);
        if (!banner.includes('http')) return null;
        return banner;
    }
    catch {
        return null;
    }
}