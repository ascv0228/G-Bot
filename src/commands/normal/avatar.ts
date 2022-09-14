import Discord from "discord.js";
import tools from "../../utils/tools";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import { DiscordBanners } from 'discord-banners';

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
                value: `${client.prefix}avatar <@${member.id}> ${msg.author.id}`,
            }
        ]
        if (member.avatar)
            opts.push({
                label: '伺服器頭像',
                value: `${client.prefix}memberavatar <@${member.id}> ${msg.author.id}`,
            })
        if (await checkHasBanner(client, member.user.id))
            opts.push({
                label: '橫幅',
                value: `${client.prefix}banner <@${member.id}> ${msg.author.id}`,
            })
        const row = new Discord.ActionRowBuilder<Discord.SelectMenuBuilder>()
            .addComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('select del')
                    .setPlaceholder('請選擇頭像來源/橫幅')
                    .addOptions(opts),
            );

        await msg.channel.send({ components: [row] });
    }
};


async function checkHasBanner(client: ZClient, userId: string) {

    const discordBanners = new DiscordBanners(client);
    try {
        const banner = await discordBanners.getBanner(userId, { size: 2048, format: "png", forceStatic: false });
        if (!banner.includes('http')) return null;
        return banner;
    }
    catch {
        return null;
    }
}