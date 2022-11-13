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
                value: `${client.prefix}guild-icon ${guild.id} ${msg.author.id}`,
            })
        if (guild.banner)
            opts.push({
                label: '伺服器橫幅',
                value: `${client.prefix}guild-banner ${guild.id} ${msg.author.id}`,
            })
        if (guild.splash)
            opts.push({
                label: '伺服器邀請連結背景',
                value: `${client.prefix}guild-splash ${guild.id} ${msg.author.id}`,
            })
        opts.push({
            label: '伺服器邀請連結',
            value: `${client.prefix}guild-invite ${guild.id} ${msg.author.id}`,
        })
        const row = new Discord.ActionRowBuilder<Discord.SelectMenuBuilder>()
            .addComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('select del')
                    .setPlaceholder('請選擇伺服器頭像/橫幅/邀請連結背景/邀請連結')
                    .addOptions(opts),
            );

        await msg.channel.send({ components: [row] });
    }
}
