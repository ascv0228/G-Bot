import Discord from "discord.js";
import { ZClient } from "../../structure/client";
import { CmdType } from "../../utils/types";
import dcUtil from "../../utils/discord-util";
import auth from "../../utils/auth";


export = {
    name: "guild-info",
    aliases: ['guild', 'server', 'gi'],
    description: '查看伺服器資訊',
    permissions: [],
    roles: [],
    type: [CmdType.Universal],
    usage: [
        ""
    ],

    async execute(client: ZClient, msg: Discord.Message, args: string[]) {
        let guild: Discord.Guild;
        if (auth.isDeveloperUser(msg.member))
            guild = await dcUtil.getGuildByID(client, args[0]) || msg.guild;
        else
            guild = msg.guild

        let opts = new Array();
        if (guild.icon)
            opts.push({
                label: '伺服器頭像',
                value: `guild-icon ${guild.id}`,
            })
        if (guild.banner)
            opts.push({
                label: '伺服器橫幅',
                value: `guild-banner ${guild.id}`,
            })
        if (guild.splash)
            opts.push({
                label: '伺服器邀請連結背景',
                value: `guild-splash ${guild.id}`,
            })

        opts.push({
            label: '伺服器一般資訊',
            value: `guild-info ${guild.id}`,
        })
        opts.push({
            label: '伺服器邀請連結',
            value: `guild-invite ${guild.id}`,
        })
        const row = new Discord.ActionRowBuilder<Discord.StringSelectMenuBuilder>()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId(`guild###${msg.author.id}`)
                    .setPlaceholder('請選擇伺服器頭像/橫幅/邀請連結背景/邀請連結')
                    .addOptions(opts),
            );

        await msg.channel.send({ components: [row] });
    }
}
